import * as swaggerUi from 'swagger-ui-express';
import { ControllerMethods, getHost, ServerConfig } from '../models';
import { Application, WithWebsocketMethod } from 'express-ws';
export async function SwaggerCreator(
  server: Application & WithWebsocketMethod,
  controllers: { [controllerName: string]: any },
  config: ServerConfig,
) {
  if (!config.swaggerPath) return;
  server.use(config.swaggerPath, swaggerUi.serve, swaggerUi.setup(createSwaggerJson(controllers, config)));
}

function createSwaggerJson(controllers: { [controllerName: string]: any }, config: ServerConfig) {
  return {
    ...getHeader(config),
    ...getPaths(controllers),
  };
}

const swaggerMethods = {
  '[GET]': 'get',
  '[POST]': 'post',
  '[PUT]': 'put',
  '[DELETE]': 'delete',
};

function getHeader(config: ServerConfig) {
  return {
    openapi: '3.0.3',
    info: {
      title: config.swaggerTitle ?? 'NodeNet API',
      description: config.swaggerDescription ?? 'NodeNet server API',
      version: config.version ?? '1.0.0',
    },
    servers: [
      {
        url: `${getHost(config)}:${config.port}`,
      },
    ],
  };
}

function getPaths(controllers: { [controllerName: string]: any }) {
  const paths = {};
  for (const controllerName in controllers) {
    const controller = controllers[controllerName];
    if (controller.method === '[WS]') continue; // Skip WebSocket controllers
    if (!controller.path) continue;
    paths[controller.path] = {
      [swaggerMethods[controller.method]]: {
        description: controller.description ?? controllerName,
        ...getResponse(),
        ...getRequestBody(controller.method),
      },
    };
  }
  return { paths };
}

function getResponse() {
  return {
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
}

function getRequestBody(method: ControllerMethods) {
  if (method === '[PUT]' || method === '[POST]')
    return {
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
  return {};
}
