"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const main_1 = require("../main");
function Module(...modules) {
    return function (target) {
        const instance = new target();
        (0, main_1.main)(instance === null || instance === void 0 ? void 0 : instance.config).then();
        if (instance.init)
            instance.init();
    };
}
exports.Module = Module;
//# sourceMappingURL=module.main.js.map