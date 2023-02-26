"use strict";
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
exports.Controller = void 0;
const main_1 = require("../main");
const _utils_1 = require("../_utils");
const ws_1 = require("ws");
function Controller(method, path) {
    return function decorator(target) {
        const controller = new target();
        controller.method = method;
        controller.path = path;
        if (method === '[WS]')
            controller.websocket = new ws_1.WebSocketServer({ noServer: true });
        if (!controller.call)
            return _utils_1.Logger.error(`Controller "${target.name}" does not have an call method`);
        if (!target.name.endsWith('Controller'))
            return _utils_1.Logger.error(`Controller name "${target.name}" does not end with Controller`);
        if (controller.dispatch) {
            controller.dispatch = (...args) => __awaiter(this, void 0, void 0, function* () {
                const serviceInstance = main_1.services[target.name.replace('Controller', 'Service')];
                if (!serviceInstance)
                    return _utils_1.Logger.warn(`Service "${target.name.replace('Controller', 'Service')}" not found`);
                return serviceInstance.call(...args);
            });
        }
        return (main_1.controllers[target.name] = controller);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.main.js.map