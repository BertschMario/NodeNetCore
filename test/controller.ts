import { Controller, IController } from '../src';

@Controller('[GET]', '/')
export class TestController extends IController {
  async call(server) {
    console.log('HERE Controller');
    const data = await this.dispatch('D-Controller');
    console.log(data);
    return server.error(data);
  }
}
