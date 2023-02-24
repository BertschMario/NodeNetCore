import { Server } from '../server/server.creator';

export class IService {
  public async dispatch(...args: any): Promise<any> {}
  public async call(...args: any): Promise<any> {}
}
