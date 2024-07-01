import { main } from '../../main';

/**
 * Module Decorator
 * @param modules The modules imports all controllers, services and databases you have defined
 * @see http://www.nodenet.wiki/decorator/module
 * @constructor Decorator
 */
export function Module(...modules: any[]) {
  return function (target: any) {
    // Create the module instance
    const instance = new target();

    // Check if the module has the init method and call it
    if (instance.init) instance.init().then();

    // Call the main function with the module config
    main(instance?.config).then();
  };
}
