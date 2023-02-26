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

@Controller('[WS]', '/testws')
export class TestWSController extends IController {
  async call(server) {
    server.ws.getId();
    server.ws.onMessage((id, payload) => {
      payload = payload.toString();
      console.log('onMessage', id, payload);
      server.ws.sendTo(id, 'onMessage');
      if (payload === 'all') server.ws.sendAll('onMessage');
      if (payload === 'add') server.ws.addToGroup('test', id);
      if (payload === 'group') server.ws.sendToGroup('test', 'onMessage');
    });

    server.ws.onClose((id) => {
      console.log('onClose', id);
    });

    return server.ok();
  }
}
