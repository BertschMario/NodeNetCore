import { IService } from '../../classes';
import { databases, services } from '../../main';
import { Logger } from '../../helper';

/**
 * Service Decorator
 * @see http://www.nodenet.wiki/decorator/service
 * @constructor Decorator
 */
export function Service() {
  return function decorator(target: typeof IService) {
    // Create the service instance
    const service = new target();

    // Check if the service has a call method
    if (!service.call) return Logger.error(`Service "${target.name}" does not have an call method`);

    // Check if the service name ends with Service
    if (!target.name.endsWith('Service'))
      return Logger.error(`Service name "${target.name}" does not end with Service`);

    // If the service has a dispatch method, set it to call the database
    if (service.dispatch)
      service.dispatch = async (...args: any) => {
        const databaseInstance = databases[target.name.replace('Service', 'Database')];
        if (!databaseInstance) return Logger.warn(`Database "${target.name.replace('Service', 'Database')}" not found`);
        return databaseInstance.call(...args);
      };

    // Add the service to the services object
    return (services[target.name] = service);
  };
}
