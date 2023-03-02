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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerCreator = void 0;
const express_1 = __importDefault(require("express"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const helper_1 = require("../helper");
const models_1 = require("../models");
function SwaggerCreator(controllers, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.swagger)
            return;
        const swaggerServer = (0, express_1.default)();
        swaggerServer
            .listen(config.swagger.port, () => {
            swaggerServer.use(`/api`, swaggerUi.serve, swaggerUi.setup(createSwaggerJson(controllers, config)));
        })
            .on('error', (e) => helper_1.Logger.error(e));
    });
}
exports.SwaggerCreator = SwaggerCreator;
function createSwaggerJson(controllers, config) {
    var _a, _b, _c, _d, _e, _f;
    const paths = {};
    for (const controllerName in controllers) {
        const controller = controllers[controllerName];
        if (!controller.path)
            continue;
        paths[controller.path] = {
            [getMethod(controller.method)]: Object.assign({ description: (_a = controller.description) !== null && _a !== void 0 ? _a : controllerName }, getBody(getMethod(controller.method))),
        };
    }
    return {
        openapi: '3.0.3',
        info: {
            title: (_c = (_b = config.swagger) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : 'NodeNet API',
            description: (_e = (_d = config.swagger) === null || _d === void 0 ? void 0 : _d.description) !== null && _e !== void 0 ? _e : '',
            version: (_f = config.version) !== null && _f !== void 0 ? _f : '1.0.0',
        },
        servers: [
            {
                url: `${(0, models_1.getHost)(config)}:${config.port}`,
            },
        ],
        paths,
    };
}
function getBody(method) {
    let body = {
        responses: {
            200: {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                    'text/plain': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    };
    if (method === 'post' || method === 'put')
        body = Object.assign(Object.assign({}, body), { requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                    'text/plain': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            } });
    return body;
}
function getMethod(method) {
    switch (method) {
        case '[GET]':
            return 'get';
        case '[POST]':
            return 'post';
        case '[PUT]':
            return 'put';
        case '[DELETE]':
            return 'delete';
        case '[WS]':
            return 'ws';
        default:
            return 'get';
    }
}
//# sourceMappingURL=swagger.creator.js.map