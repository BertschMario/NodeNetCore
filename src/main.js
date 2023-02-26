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
exports.main = exports.webSocketGroups = exports.webSocketConnections = exports.databases = exports.controllers = exports.services = void 0;
const server_1 = require("./_utils/server");
const _utils_1 = require("./_utils");
exports.services = {};
exports.controllers = {};
exports.databases = {};
exports.webSocketConnections = {};
exports.webSocketGroups = {};
function main(config) {
    return __awaiter(this, void 0, void 0, function* () {
        _utils_1.Logger.info('Server is starting...');
        if (!config)
            config = { name: 'NodeNet Server', port: 3000 };
        yield (0, server_1.ServerCreator)(exports.controllers, config);
        _utils_1.Logger.info('Server is started: ' + 'http://0.0.0.0:' + config.port);
    });
}
exports.main = main;
//# sourceMappingURL=main.js.map