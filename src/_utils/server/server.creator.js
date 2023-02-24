"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ServerCreator = void 0;
const http = __importStar(require("http"));
function ServerCreator(controllers, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = http.createServer((req, res) => __awaiter(this, void 0, void 0, function* () {
            for (const key in controllers) {
                const controller = controllers[key];
                if (controller.path === req.url && controller.method === `[${req.method}]`)
                    return res.end(yield controller.call(getServerObject(req, res)));
            }
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(getPayload({ error: 'Not found', code: 404 }));
        }));
        server.listen(config.port);
    });
}
exports.ServerCreator = ServerCreator;
function getServerObject(req, res) {
    return {
        req,
        res,
        getBody: () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    resolve(getPayload(body));
                });
            });
        }),
        ok: (payload) => __awaiter(this, void 0, void 0, function* () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return getPayload({ result: payload });
        }),
        error: (payload, code) => __awaiter(this, void 0, void 0, function* () {
            res.writeHead(code !== null && code !== void 0 ? code : 500, { 'Content-Type': 'application/json' });
            return getPayload({ error: payload !== null && payload !== void 0 ? payload : 'Internal Server Error', code: code !== null && code !== void 0 ? code : 500 });
        }),
    };
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