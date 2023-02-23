import { Database } from "../src/database";

@Database()
export class TestDatabase {
  call(v) {
    console.log("HERE Database", v);
    return "From database";
  }
}
