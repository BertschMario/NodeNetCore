"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestWSController = exports.Test2Controller = exports.TestController = void 0;
const src_1 = require("../src");
let TestController = class TestController extends src_1.IController {
    call(server) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('HERE Controller');
            const data = yield this.dispatch('D-Controller');
            console.log(data);
            return server.error(data);
        });
    }
};
TestController = __decorate([
    (0, src_1.Controller)('[GET]', '/hallo')
], TestController);
exports.TestController = TestController;
let Test2Controller = class Test2Controller extends src_1.IController {
    call(server) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield server.getBody();
            console.log(data);
            return server.ok(data);
        });
    }
};
Test2Controller = __decorate([
    (0, src_1.Controller)('[POST]', '/testPost')
], Test2Controller);
exports.Test2Controller = Test2Controller;
let TestWSController = class TestWSController extends src_1.IController {
    call(server) {
        return __awaiter(this, void 0, void 0, function* () {
            server.ws.getId();
            server.ws.onMessage((id, payload) => {
                payload = payload.toString();
                console.log('onMessage', id, payload);
                server.ws.sendTo(id, 'onMessage');
                if (payload === 'all')
                    server.ws.sendAll('onMessage');
                if (payload === 'add')
                    server.ws.addToGroup('test', id);
                if (payload === 'group')
                    server.ws.sendToGroup('test', 'onMessage');
            });
            server.ws.onClose((id) => {
                console.log('onClose', id);
            });
            return server.ok();
        });
    }
};
TestWSController = __decorate([
    (0, src_1.Controller)('[WS]', '/testws')
], TestWSController);
exports.TestWSController = TestWSController;
//# sourceMappingURL=controller.js.map