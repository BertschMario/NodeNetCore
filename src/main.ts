import { Server, ServerCreator } from './_utils/server';
import { getHost, Logger, ServerConfig, SwaggerCreator } from './_utils';
import { WebSocket } from 'ws';

export let services: { [serviceName: string]: any } = {};
export let controllers: { [controllerName: string]: any } = {};
export let databases: { [databaseName: string]: any } = {};
export let webSocketConnections: { [id: string]: WebSocket } = {};
export let webSocketGroups: { [groupName: string]: string[] } = {};
export async function main(config?: ServerConfig) {
  Logger.info('Server is starting...');
  if (!config) config = { name: 'NodeNet Server', port: 3000 };
  await ServerCreator(controllers, config);
  await SwaggerCreator(controllers, config);
  Logger.info(`Server is started: ${getHost(config)}:${config.port}`);
}
