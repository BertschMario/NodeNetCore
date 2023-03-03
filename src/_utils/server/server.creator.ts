import * as http from 'http';
import { ServerConfig } from '../models';
import { WebSocket } from 'ws';
import { getWebsocketFunctions } from './websocket.functions';
import express from 'express';
import { SwaggerCreator } from './swagger.creator';
import expressWs from 'express-ws';

type RES = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage };
type REQ = http.IncomingMessage;

export type Server = {
  req: REQ;
  res: RES;
  getBody: () => Promise<any>;
  ok: (payload?: any) => Promise<any>;
  error: (payload?: any, code?: number) => Promise<any>;
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
    switch (controller.method) {
      case '[GET]': {
        server.get(controller.path, async (req, res) => {
          writeHead(res);
          res.end(await controller.call(getServerObject(req, res)));
        });
        break;
      }
      case '[WS]': {
        server.get(controller.path, (req, res) => {
          writeHead(res);
          res.end();
        });
        server.ws(controller.path, async (ws, req) => {
          await controller.call(getServerObject(req, undefined, ws));
        });
        break;
      }
      case '[POST]': {
        server.post(controller.path, async (req, res) => {
          writeHead(res);
          res.end(await controller.call(getServerObject(req, res)));
        });
        break;
      }
      case '[PUT]': {
        server.put(controller.path, async (req, res) => {
          writeHead(res);
          res.end(await controller.call(getServerObject(req, res)));
        });
        break;
      }
      case '[DELETE]': {
        server.delete(controller.path, async (req, res) => {
          writeHead(res);
          res.end(await controller.call(getServerObject(req, res)));
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

function writeHead(res: RES) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Origin,Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function getServerObject(req: REQ, res?: RES, ws?: WebSocket): Server {
  return {
    req,
    res,
    getBody: async () => {
      return new Promise((resolve) => {
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
