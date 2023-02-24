import { Server, ServerCreator } from './_utils/server';
import { Logger, ServerConfig } from './_utils';

export let services: { [key: string]: any } = {};
export let controllers: { [key: string]: any } = {};
export let databases: { [key: string]: any } = {};
export async function main(config?: ServerConfig) {
  Logger.info('Server is starting...');
  if (!config) config = { name: 'NodeNet Server', port: 3000 };
  await ServerCreator(controllers, config);
  Logger.info('Server is started: ' + 'http://0.0.0.0:' + config.port);
}
