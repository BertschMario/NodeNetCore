import { Module, ServerConfig } from '../src';
import * as controller from './controller';
import * as service from './service';
import * as database from './database';

@Module(controller, service, database)
export class AppModule {
  config: ServerConfig = {
    name: 'Test Server',
    port: 3000,
  };
  init() {
    console.log('HERE INIT');
  }
}
