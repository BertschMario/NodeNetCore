import * as http from 'http';
import { ServerConfig } from '../models';
import { Logger } from '../helper';
import { WebSocket } from 'ws';
import { getWebsocketFunctions } from './websocket.functions';

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
  const server = http.createServer(async (req, res) => {
    for (const key in controllers) {
      const controller = controllers[key];
      //Websocket request
      if (controller.websocket && controller.method === '[WS]' && req.headers.upgrade && controller.path === req.url) {
        return await new Promise((resolve) => {
          controller.websocket.handleUpgrade(req, req.socket, Buffer.alloc(0), async (ws: WebSocket) => {
            await controller.call(getServerObject(req, res, ws));
            resolve();
          });
        });
      }
      //Http request
      else if (controller.path === req.url && controller.method === `[${req.method}]`)
        return res.end(await controller.call(getServerObject(req, res)));
    }
    //Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(getPayload({ error: 'Not found', code: 404 }));
  });
  server.listen(config.port);
}

function getServerObject(req: REQ, res: RES, ws?: WebSocket): Server {
  return {
    req,
    res,
    getBody: async () => {
      return new Promise((resolve, reject) => {
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
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return getPayload({ result: payload });
    },
    error: async (payload?: any, code?: number) => {
      res.writeHead(code ?? 500, { 'Content-Type': 'application/json' });
      return getPayload({ error: payload ?? 'Internal Server Error', code: code ?? 500 });
    },
    ...getWebsocketFunctions(req, res, ws),
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
