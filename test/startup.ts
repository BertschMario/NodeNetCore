import { Module } from "../src/module";
import * as controller from "./controller";
import * as service from "./service";
import * as database from "./database";

@Module(controller, service, database)
export class AppModule {}
