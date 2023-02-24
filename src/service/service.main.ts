import { Logger } from '../_utils';
import { databases, services } from '../main';

export function Service() {
  return function decorator(target) {
    const service = new target();

    if (!service.call) return Logger.error(`Service "${target.name}" does not have an call method`);
    if (!target.name.endsWith('Service'))
      return Logger.error(`Service name "${target.name}" does not end with Service`);

    if (service.dispatch)
      service.dispatch = async (...args: any) => {
        const databaseInstance = databases[target.name.replace('Service', 'Database')];
        if (!databaseInstance) return Logger.warn(`Database "${target.name.replace('Service', 'Database')}" not found`);
        return databaseInstance.call(...args);
      };

    return (services[target.name] = service);
  };
}
