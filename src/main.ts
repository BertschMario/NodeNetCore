import { WebSocket } from 'ws';
import { IController, IDatabase, IService } from './classes';
import { ServerCreator } from './server';
import { getHost, ServerConfig } from './types';
import { Logger } from './helper';

// Variable to store all services
export let services: { [serviceName: string]: IService } = {};
// Variable to store all controllers
export let controllers: { [controllerName: string]: IController } = {};
// Variable to store all databases
export let databases: { [databaseName: string]: IDatabase } = {};
// Variable to store all web socket connections
export let webSocketConnections: { [id: string]: WebSocket } = {};
// Variable to store all web socket groups
export let webSocketGroups: { [groupName: string]: string[] } = {};

/**
 * Main function to start the server
 * @param {ServerConfig} config The server configuration
 */
export async function main(config: ServerConfig = { name: 'NodeNet Server', port: 3000 }) {
  // Create the server
  await ServerCreator(controllers, config);
  // Log the server information
  Logger.info(`Server running: ${getHost(config)}:${config.port}`);
}
