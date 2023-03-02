import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import http from 'http';
import { Logger } from '../helper';
import { ControllerMethods, getHost, ServerConfig } from '../models';
export async function SwaggerCreator(controllers: { [controllerName: string]: any }, config: ServerConfig) {
  if (!config.swagger) return;
  const swaggerServer = express();
  swaggerServer
    .listen(config.swagger.port, () => {
      swaggerServer.use(`/api`, swaggerUi.serve, swaggerUi.setup(createSwaggerJson(controllers, config)));
    })
    .on('error', (e) => Logger.error(e));
}

function createSwaggerJson(controllers: { [controllerName: string]: any }, config: ServerConfig) {
  const paths = {};
  for (const controllerName in controllers) {
    const controller = controllers[controllerName];
    if (!controller.path) continue;
    paths[controller.path] = {
      [getMethod(controller.method)]: {
        description: controller.description ?? controllerName,
        ...getBody(getMethod(controller.method)),
      },
    };
  }

  return {
    openapi: '3.0.3',
    info: {
      title: config.swagger?.title ?? 'NodeNet API',
      description: config.swagger?.description ?? '',
      version: config.version ?? '1.0.0',
    },
    servers: [
      {
        url: `${getHost(config)}:${config.port}`,
      },
    ],
    paths,
  };
}

function getBody(method: string) {
  let body: any = {
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
          'text/plain': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  };
  if (method === 'post' || method === 'put')
    body = {
      ...body,
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
          'text/plain': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    };
  return body;
}

function getMethod(method: ControllerMethods) {
  switch (method) {
    case '[GET]':
      return 'get';
    case '[POST]':
      return 'post';
    case '[PUT]':
      return 'put';
    case '[DELETE]':
      return 'delete';
    case '[WS]':
      return 'ws';
    default:
      return 'get';
  }
}
