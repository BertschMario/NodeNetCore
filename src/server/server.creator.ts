import { WebSocket } from 'ws';
import { getWebsocketFunctions } from './websocket.functions';
import express from 'express';
import expressWs from 'express-ws';
import jsonWebToken from 'jsonwebtoken';
import { IController, ServerError } from '../classes';
import { REQ, RES, Server, ServerConfig } from '../types';
import { Logger } from '../helper';

const server = expressWs(express()).app;

function setGetController(controller: IController) {
  server.get(controller['_nn_path'], async (req, res) => {
    if (!(await checkAuth(req, res, controller))) return;
    writeHead(res);
    const serverObject = getServerObject(req, res, undefined);
    controller
      .call(serverObject)
      .then((result: any) => responseOK(res, result))
      .catch((error: ServerError) => responseError(res, error));
  });
}

function setWsController(controller: IController) {
  server.get(controller['_nn_path'], async (req, res) => {
    if (!(await checkAuth(req, res, controller))) return;
    writeHead(res);
    res.end();
  });
  server.ws(controller['_nn_path'], async (ws, req) => {
    await controller.call(getServerObject(req, undefined, ws));
  });
}

function setPostController(controller: IController) {
  server.post(controller['_nn_path'], async (req, res) => {
    if (!(await checkAuth(req, res, controller))) return;
    writeHead(res);
    const serverObject = getServerObject(req, res, undefined);
    controller
      .call(serverObject)
      .then((result: any) => responseOK(res, result))
      .catch((error: ServerError) => responseError(res, error));
  });
}

function setPutController(controller: IController) {
  server.put(controller['_nn_path'], async (req, res) => {
    if (!(await checkAuth(req, res, controller))) return;
    writeHead(res);
    const serverObject = getServerObject(req, res, undefined);
    controller
      .call(serverObject)
      .then((result: any) => responseOK(res, result))
      .catch((error: ServerError) => responseError(res, error));
  });
}

function setDeleteController(controller: IController) {
  server.delete(controller['_nn_path'], async (req, res) => {
    if (!(await checkAuth(req, res, controller))) return;
    writeHead(res);
    const serverObject = getServerObject(req, res, undefined);
    controller
      .call(serverObject)
      .then((result: any) => responseOK(res, result))
      .catch((error: ServerError) => responseError(res, error));
  });
}

const controllerMethods = {
  '[GET]': setGetController,
  '[WS]': setWsController,
  '[POST]': setPostController,
  '[PUT]': setPutController,
  '[DELETE]': setDeleteController,
};

function responseOK(res: RES, payload: any) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ result: payload, code: 200 }));
}

function responseError(res: RES, error: ServerError) {
  res.writeHead(error.code, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ error: error.message, code: error.code }));
}

export async function ServerCreator(controllers: { [key: string]: IController }, config: ServerConfig) {
  for (const key in controllers) {
    const controller = controllers[key] as IController;
    if (controller['_nn_useAuth'] && !process.env.JWT_SECRET)
      Logger.error(`Controller ${key} uses auth but no jwtSecret is set`);

    controllerMethods[controller['_nn_method']](controller);
  }
  server.options('*', (req, res) => {
    writeHead(res);
    res.end();
  });

  server.get('*', (req, res) => {
    writeHead(res);
    res.end(getPayload({ error: 'Not found', code: 404 }));
  });
  server.listen(config.port);
}

async function checkAuth(req: REQ, res: RES, controller: IController) {
  // If the controller doesn't use auth, return true
  if (!controller['_nn_useAuth']) return true;

  // Check if the authorization header is set and valid
  return new Promise((resolve) => {
    // Get the token from the authorization header
    const token = req.headers.authorization ?? null;

    // If the authorization header is not set, return false and send a 401 response
    if (!token) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(getPayload({ error: 'Unauthorized', code: 401 }));
      return resolve(false);
    }

    // Verify the token
    jsonWebToken.verify(token, process.env.JWT_SECRET, (err: Error) => {
      if (err) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(getPayload({ error: 'Unauthorized', code: 401 }));
        return resolve(false);
      } else return resolve(true);
    });
  });
}

function writeHead(res: RES) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Origin,Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function getServerObject(req: REQ, res?: RES, ws?: WebSocket): Server {
  return {
    req,
    res,
    auth: {
      signToken: async (payload: any, expiresInHours?: number) => {
        if (!process.env.JWT_SECRET) throw Logger.error(`No jwtSecret is set`);
        return jsonWebToken.sign(payload, process.env.JWT_SECRET, {
          expiresIn: expiresInHours ? `${expiresInHours}h` : '24h',
        });
      },
      getAuthToken: async () => {
        return req.headers.authorization ?? '';
      },
      getAuthTokenObject: async <T>(): Promise<T | null> => {
        const token = req.headers.authorization ?? '';
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1]));
      },
    },
    getBody: async <T>() => {
      return new Promise<T>((resolve) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          resolve(getPayload(body));
        });
      });
    },
    ok: async (payload?: any) => {
      res && res.writeHead(200, { 'Content-Type': 'application/json' });
      return getPayload({ result: payload });
    },
    error: async (payload?: any, code?: number) => {
      res && res.writeHead(code ?? 500, { 'Content-Type': 'application/json' });
      return getPayload({ error: payload ?? 'Internal Server Error', code: code ?? 500 });
    },
    ...getWebsocketFunctions(req, ws),
  };
}

function getPayload(payload?: any) {
  try {
    if (typeof payload === 'string') payload = JSON.parse(payload);
    else payload = JSON.stringify(payload);
  } catch (e) {
    return;
  }
  return payload;
}
