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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerCreator = void 0;
const websocket_functions_1 = require("./websocket.functions");
const express_1 = __importDefault(require("express"));
const swagger_creator_1 = require("./swagger.creator");
const express_ws_1 = __importDefault(require("express-ws"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../helper");
function ServerCreator(controllers, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = (0, express_ws_1.default)((0, express_1.default)()).app;
        for (const key in controllers) {
            const controller = controllers[key];
            if (controller.useAuth && !config.jwtSecret)
                helper_1.Logger.error(`Controller ${key} uses auth but no jwtSecret is set in config`);
            switch (controller.method) {
                case '[GET]': {
                    server.get(controller.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield checkAuth(req, res, controller, config)))
                            return;
                        writeHead(res);
                        res.end(yield controller.call(getServerObject(req, res, undefined, config)));
                    }));
                    break;
                }
                case '[WS]': {
                    server.get(controller.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield checkAuth(req, res, controller, config)))
                            return;
                        writeHead(res);
                        res.end();
                    }));
                    server.ws(controller.path, (ws, req) => __awaiter(this, void 0, void 0, function* () {
                        yield controller.call(getServerObject(req, undefined, ws, config));
                    }));
                    break;
                }
                case '[POST]': {
                    server.post(controller.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield checkAuth(req, res, controller, config)))
                            return;
                        writeHead(res);
                        res.end(yield controller.call(getServerObject(req, res, undefined, config)));
                    }));
                    break;
                }
                case '[PUT]': {
                    server.put(controller.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield checkAuth(req, res, controller, config)))
                            return;
                        writeHead(res);
                        res.end(yield controller.call(getServerObject(req, res, undefined, config)));
                    }));
                    break;
                }
                case '[DELETE]': {
                    server.delete(controller.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield checkAuth(req, res, controller, config)))
                            return;
                        writeHead(res);
                        res.end(yield controller.call(getServerObject(req, res, undefined, config)));
                    }));
                    break;
                }
            }
        }
        server.options('*', (req, res) => {
            writeHead(res);
            res.end();
        });
        yield (0, swagger_creator_1.SwaggerCreator)(server, controllers, config);
        server.get('*', (req, res) => {
            writeHead(res);
            res.end(getPayload({ error: 'Not found', code: 404 }));
        });
        server.listen(config.port);
    });
}
exports.ServerCreator = ServerCreator;
function checkAuth(req, res, controller, config) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            var _a;
            if (controller.useAuth) {
                if (!req.headers.authorization) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(getPayload({ error: 'Unauthorized', code: 401 }));
                    return resolve(false);
                }
                const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
                jsonwebtoken_1.default.verify(token, config.jwtSecret, (err) => {
                    if (err) {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(getPayload({ error: 'Unauthorized', code: 401 }));
                        return resolve(false);
                    }
                    else
                        return resolve(true);
                });
            }
            resolve(true);
        });
    });
}
function writeHead(res) {
    res.setHeader('Access-Control-Allow-Origin', 'same-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Origin,Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
}
function getServerObject(req, res, ws, config) {
    return Object.assign({ req,
        res, signToken: (payload, expiresInHours) => __awaiter(this, void 0, void 0, function* () {
            if (!config || !config.jwtSecret)
                throw helper_1.Logger.error(`No jwtSecret is set in config`);
            return jsonwebtoken_1.default.sign(payload, config.jwtSecret, { expiresIn: expiresInHours ? `${expiresInHours}h` : '24h' });
        }), getBody: () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    resolve(getPayload(body));
                });
            });
        }), ok: (payload) => __awaiter(this, void 0, void 0, function* () {
            res && res.writeHead(200, { 'Content-Type': 'application/json' });
            return getPayload({ result: payload });
        }), error: (payload, code) => __awaiter(this, void 0, void 0, function* () {
            res && res.writeHead(code !== null && code !== void 0 ? code : 500, { 'Content-Type': 'application/json' });
            return getPayload({ error: payload !== null && payload !== void 0 ? payload : 'Internal Server Error', code: code !== null && code !== void 0 ? code : 500 });
        }) }, (0, websocket_functions_1.getWebsocketFunctions)(req, ws));
}
function getPayload(payload) {
    try {
        if (typeof payload === 'string')
            payload = JSON.parse(payload);
        else
            payload = JSON.stringify(payload);
    }
    catch (e) {
        return;
    }
    return payload;
}
//# sourceMappingURL=server.creator.js.map