import { ServerCreator } from './_utils/server';
import { getHost, Logger, ServerConfig } from './_utils';
import { WebSocket } from 'ws';

export let services: { [serviceName: string]: any } = {};
export let controllers: { [controllerName: string]: any } = {};
export let databases: { [databaseName: string]: any } = {};
export let webSocketConnections: { [id: string]: WebSocket } = {};
export let webSocketGroups: { [groupName: string]: string[] } = {};
export async function main(config?: ServerConfig) {
  if (!config) config = { name: 'NodeNet Server', port: 3000 };
  await ServerCreator(controllers, config);
  Logger.info(`Server running: ${getHost(config)}:${config.port}`);
  if (config.swagger) Logger.info(`Swagger running: ${getHost(config)}:${config.port}${config.swagger.path}/`);
}
