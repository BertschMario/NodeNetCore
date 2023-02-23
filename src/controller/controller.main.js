"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const main_1 = require("../main");
const _utils_1 = require("../_utils");
function Controller(method, path) {
    return function decorator(target) {
        const controller = new target();
        if (!controller.call)
            return _utils_1.Logger.error(`Controller "${target.name}" does not have an call method`);
        if (!target.name.endsWith("Controller"))
            return _utils_1.Logger.error(`Controller name "${target.name}" does not end with Controller`);
        if (controller.dispatch) {
            controller.dispatch = (...args) => {
                const serviceName = target.name.replace("Controller", "") + "Service";
                return main_1.services[serviceName].call(...args);
            };
        }
        main_1.controllers[target.name] = controller;
        setTimeout(() => {
            controller.call();
        }, 500);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.main.js.map