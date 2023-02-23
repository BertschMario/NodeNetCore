import { controllers, services } from "../main";
import { ControllerMethods, Logger } from "../_utils";

export function Controller<T>(method: ControllerMethods, path: string) {
  return function decorator(target) {
    const controller = new target();

    if (!controller.call) return Logger.error(`Controller "${target.name}" does not have an call method`);
    if (!target.name.endsWith("Controller"))
      return Logger.error(`Controller name "${target.name}" does not end with Controller`);

    if (controller.dispatch) {
      controller.dispatch = (...args: any) => {
        const serviceName = target.name.replace("Controller", "") + "Service";
        return services[serviceName].call(...args);
      };
    }

    controllers[target.name] = controller;
    setTimeout(() => {
      controller.call();
    }, 500);
  };
}
