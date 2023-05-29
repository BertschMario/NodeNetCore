import * as http from 'http';
import { ServerConfig } from '../models';
import { WebSocket } from 'ws';
import { getWebsocketFunctions } from './websocket.functions';
import express from 'express';
import { SwaggerCreator } from './swagger.creator';
import expressWs from 'express-ws';
import jsonWebToken from 'jsonwebtoken';
import {Logger} from "../helper";

type RES = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage };
type REQ = http.IncomingMessage;


export type Server = {
  req: REQ;
  res: RES;
  getBody: <T>() => Promise<T>;
  ok: (payload?: any) => Promise<any>;
  error: (payload?: any, code?: number) => Promise<any>;
  auth: {
    signToken: (payload: any, expiresInHours?: number) => Promise<string>;
    getAuthToken: () => Promise<string>;
    getAuthTokenObject: <T>() => Promise<T | null>;
  }
  ws: {
    onMessage: (callback: (id: string, payload: any) => void) => void;
    onClose: (callback: (id: string) => void) => void;
    getId: () => string;
    sendTo: (id: string, payload: any) => void;
    sendAll: (payload: any) => void;
    sendAllExcept: (id: string, payload: any) => void;
    addToGroup: (groupName: string, id: string) => void;
    sendToGroup: (groupName: string, payload: any) => void;
    sendToGroupExcept: (groupName: string, id: string, payload: any) => void;
    removeFromGroup: (groupName: string, id: string) => void;
  };
};

export async function ServerCreator(controllers: { [key: string]: any }, config: ServerConfig) {
  const server = expressWs(express()).app;
  for (const key in controllers) {
    const controller = controllers[key];
    if(controller.useAuth && !config.jwtSecret) Logger.error(`Controller ${key} uses auth but no jwtSecret is set in config`);
    switch (controller.method) {
      case '[GET]': {
        server.get(controller.path, async (req, res) => {
          if(!await checkAuth(req, res, controller, config)) return;
          writeHead(res);
          const serverObject = getServerObject(req, res,undefined, config);
          controller.call(serverObject).then((result: any) => res.end(result)).catch((error: any) => res.end(serverObject.error(error)))
        });
        break;
      }
      case '[WS]': {
        server.get(controller.path, async (req, res) => {
          if(!await checkAuth(req, res, controller, config)) return;
          writeHead(res);
          res.end();
        });
        server.ws(controller.path, async (ws, req) => {
          await controller.call(getServerObject(req, undefined, ws, config));
        });
        break;
      }
      case '[POST]': {
        server.post(controller.path, async (req, res) => {
          if(!await checkAuth(req, res, controller, config)) return;
          writeHead(res);
          const serverObject = getServerObject(req, res,undefined, config);
          controller.call(serverObject).then((result: any) => res.end(result)).catch((error: any) => res.end(serverObject.error(error)))
        });
        break;
      }
      case '[PUT]': {
        server.put(controller.path, async (req, res) => {
          if(!await checkAuth(req, res, controller, config)) return;
          writeHead(res);
          const serverObject = getServerObject(req, res,undefined, config);
          controller.call(serverObject).then((result: any) => res.end(result)).catch((error: any) => res.end(serverObject.error(error)))
        });
        break;
      }
      case '[DELETE]': {
        server.delete(controller.path, async (req, res) => {
          if(!await checkAuth(req, res, controller, config)) return;
          writeHead(res);
          const serverObject = getServerObject(req, res,undefined, config);
          controller.call(serverObject).then((result: any) => res.end(result)).catch((error: any) => res.end(serverObject.error(error)))
        });
        break;
      }
    }
  }
  server.options('*', (req, res) => {
    writeHead(res);
    res.end();
  });

  await SwaggerCreator(server, controllers, config);

  server.get('*', (req, res) => {
    writeHead(res);
    res.end(getPayload({ error: 'Not found', code: 404 }));
  });
  server.listen(config.port);
}

async function checkAuth(req: REQ, res: RES, controller: any, config: ServerConfig) {
  return new Promise((resolve) => {
    if (controller.useAuth) {
      if(!req.headers.authorization) {
        res.writeHead(401, {'Content-Type': 'application/json'});
        res.end(getPayload({error: 'Unauthorized', code: 401}));
        return resolve(false);
      }

      const token = req.headers.authorization ?? '';
      jsonWebToken.verify(token, config.jwtSecret, (err) => {
        if (err) {
          res.writeHead(401, {'Content-Type': 'application/json'});
          res.end(getPayload({error: 'Unauthorized', code: 401}));
          return resolve(false);
        }
        else return resolve(true);
      })
    }
    resolve(true);
  })
}

function writeHead(res: RES) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Origin,Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function getServerObject(req: REQ, res?: RES, ws?: WebSocket, config?: ServerConfig): Server {
  return {
    req,
    res,
    auth: {
      signToken: async (payload: any, expiresInHours?: number) => {
        if(!config || !config.jwtSecret) throw Logger.error(`No jwtSecret is set in config`);
        return jsonWebToken.sign(payload, config.jwtSecret, { expiresIn: expiresInHours ? `${expiresInHours}h` : '24h' });
      },
      getAuthToken: async () => {
        return req.headers.authorization ?? '';
      },
      getAuthTokenObject: async <T>(): Promise<T | null> => {
        const token = req.headers.authorization ?? '';
        if(!token) return null;
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
