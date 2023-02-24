import { Logger } from '../_utils';
import { databases } from '../main';

export function Database() {
  return function decorator(target) {
    const database = new target();

    if (!database.call) return Logger.error(`Database "${target.name}" does not have an call method`);
    if (!target.name.endsWith('Database'))
      return Logger.error(`Database name "${target.name}" does not end with Database`);

    return (databases[target.name] = database);
  };
}
