import { ControllerMethods } from '../../types';
import { IController } from '../../classes';
import { controllers, services } from '../../main';
import { Logger } from '../../helper';

/**
 * Controller Decorator
 * @param {ControllerMethods} method The HTTP method
 * @param {string} path The path of the controller (e.g. /api/v1/users)
 * @param {boolean} useAuth If the controller requires authentication
 * @see http://www.nodenet.wiki/decorator/controller
 * @constructor Decorator
 */
export function Controller(method: ControllerMethods, path: string, useAuth: boolean = false) {
  return function decorator(target: typeof IController) {
    // Create the controller instance
    const controller = new target();

    // Set the controller properties
    controller['_nn_method'] = method;
    controller['_nn_path'] = path;
    controller['_nn_useAuth'] = useAuth;

    // Check if the controller has a call method
    if (!controller.call) return Logger.error(`Controller "${target.name}" does not have an call method`);

    // Check if the controller name ends with Controller
    if (!target.name.endsWith('Controller'))
      return Logger.error(`Controller name "${target.name}" does not end with Controller`);

    // If the controller has a dispatch method, set it to call the service
    if (controller.dispatch) {
      controller.dispatch = async (...args: any) => {
        const serviceInstance = services[target.name.replace('Controller', 'Service')];
        if (!serviceInstance) return Logger.warn(`Service "${target.name.replace('Controller', 'Service')}" not found`);
        return serviceInstance.call(...args);
      };
    }

    // Add the controller to the controllers object
    return (controllers[target.name] = controller);
  };
}
