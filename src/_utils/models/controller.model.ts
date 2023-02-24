import { Server } from '../server/server.creator';

export class IController {
  public async dispatch(...args: any): Promise<any> {}
  public async call(server: Server): Promise<any> {}
}
