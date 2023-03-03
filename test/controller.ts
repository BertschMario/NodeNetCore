import { Controller, IController } from '../src';

interface ITest {
  firstName: string;
  lastName: string;
  age: number;
}

@Controller('[GET]', '/hallo/success')
export class TestController extends IController {
  async call(server) {
    console.log('HERE Controller');
    const data = await this.dispatch('D-Controller');
    console.log(data);
    return server.ok(data);
  }
}

@Controller('[GET]', '/hallo/error')
export class Test2Controller extends IController {
  async call(server) {
    console.log('HERE Controller');
    const data = await this.dispatch('D-Controller');
    console.log(data);
    return server.error(data, 400);
  }
}

@Controller('[POST]', '/testPost')
export class Test3Controller extends IController {
  async call(server) {
    const data = await server.getBody();
    console.log(data);
    return server.ok(data);
  }
}

@Controller('[WS]', '/testws')
export class TestWSController extends IController {
  async call(server) {
    server.ws.getId();
    console.log('Connected', server.ws.getId());
    server.ws.onMessage((id, payload) => {
      payload = payload.toString();
      console.log('onMessage', id, payload);
      server.ws.sendTo(id, 'onMessage');
      if (payload === 'all') server.ws.sendAll('onMessage');
      if (payload === 'add') server.ws.addToGroup('test', id);
      if (payload === 'group') server.ws.sendToGroup('test', 'onMessage');
    });

    server.ws.onClose((id) => {
      console.log('Disconnected', id);
    });

    return server.ok();
  }
}
