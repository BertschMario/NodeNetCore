import { Service } from "../src/service";
import { IDispatch } from "../src/_utils";

@Service()
export class TestService extends IDispatch {
  call(v) {
    console.log("HERE Service", v);
    return this.dispatch("D-Service");
  }
}
