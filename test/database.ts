import { Database, IDatabase } from '../src';

@Database()
export class TestDatabase extends IDatabase {
  async call(v) {
    console.log('HERE Database', v);
    return 'From database';
  }
}
