"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const _utils_1 = require("../_utils");
const main_1 = require("../main");
function Service() {
    return function decorator(target) {
        const service = new target();
        if (!service.call)
            return _utils_1.Logger.error(`Service "${target.name}" does not have an call method`);
        if (!target.name.endsWith("Service"))
            return _utils_1.Logger.error(`Service name "${target.name}" does not end with Service`);
        if (service.dispatch)
            service.dispatch = (...args) => {
                const databaseName = target.name.replace("Service", "") + "Database";
                return main_1.databases[databaseName].call(...args);
            };
        main_1.services[target.name] = service;
    };
}
exports.Service = Service;
//# sourceMappingURL=service.main.js.map