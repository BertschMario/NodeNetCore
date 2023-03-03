import { Server } from '../server';

export class IController {
  public async dispatch(...args: any): Promise<any> {}
  public async call(server: Server): Promise<any> {}
}
