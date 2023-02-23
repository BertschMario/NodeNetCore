import { Controller } from "../src/controller";
import { IDispatch } from "../src/_utils";

@Controller("[GET]", "/")
export class TestController extends IDispatch {
  call(v) {
    console.log("HERE Controller", v);
    const data = this.dispatch("D-Controller");
    console.log(data);
  }
}
