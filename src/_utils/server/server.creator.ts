import * as http from 'http';
import { ServerConfig } from '../models';

type RES = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage };
type REQ = http.IncomingMessage;

export type Server = {
  req: REQ;
  res: RES;
  getBody: () => Promise<any>;
  ok: (payload?: any) => Promise<any>;
  error: (payload?: any, code?: number) => Promise<any>;
};

export async function ServerCreator(controllers: { [key: string]: any }, config: ServerConfig) {
  const server = http.createServer(async (req, res) => {
    for (const key in controllers) {
      const controller = controllers[key];
      if (controller.path === req.url && controller.method === `[${req.method}]`)
        return res.end(await controller.call(getServerObject(req, res)));
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(getPayload({ error: 'Not found', code: 404 }));
  });
  server.listen(config.port);
}

function getServerObject(req: REQ, res: RES): Server {
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
