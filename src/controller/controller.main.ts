import { controllers, services } from '../main';
import { ControllerMethods, Logger } from '../_utils';
import { WebSocketServer } from 'ws';

export function Controller(method: ControllerMethods, path: string) {
  return function decorator(target) {
    const controller = new target();
    controller.method = method;
    controller.path = path;

    if (!controller.call) return Logger.error(`Controller "${target.name}" does not have an call method`);
    if (!target.name.endsWith('Controller'))
      return Logger.error(`Controller name "${target.name}" does not end with Controller`);

    if (controller.dispatch) {
      controller.dispatch = async (...args: any) => {
        const serviceInstance = services[target.name.replace('Controller', 'Service')];
        if (!serviceInstance) return Logger.warn(`Service "${target.name.replace('Controller', 'Service')}" not found`);
        return serviceInstance.call(...args);
      };
    }
    return (controllers[target.name] = controller);
  };
}
