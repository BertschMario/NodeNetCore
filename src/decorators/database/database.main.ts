import { IDatabase } from '../../classes';
import { Logger } from '../../helper';
import { databases } from '../../main';

/**
 * Database Decorator
 * @see http://www.nodenet.wiki/decorator/database
 * @constructor Decorator
 */
export function Database() {
  return function decorator(target: typeof IDatabase) {
    // Create the database instance
    const database = new target();

    // Check if the database has a call method
    if (!database.call) return Logger.error(`Database "${target.name}" does not have an call method`);

    // Check if the database name ends with Database
    if (!target.name.endsWith('Database'))
      return Logger.error(`Database name "${target.name}" does not end with Database`);

    // Add the database to the databases object
    return (databases[target.name] = database);
  };
}
