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
exports.SwaggerCreator = void 0;
const swaggerUi = __importStar(require("swagger-ui-express"));
const models_1 = require("../models");
function SwaggerCreator(server, controllers, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.swagger)
            return;
        server.use(config.swagger.path, swaggerUi.serve, swaggerUi.setup(createSwaggerJson(controllers, config)));
    });
}
exports.SwaggerCreator = SwaggerCreator;
function createSwaggerJson(controllers, config) {
    return Object.assign(Object.assign({}, getHeader(config)), getPaths(controllers));
}
const swaggerMethods = {
    '[GET]': 'get',
    '[POST]': 'post',
    '[PUT]': 'put',
    '[DELETE]': 'delete',
};
function getHeader(config) {
    var _a, _b, _c, _d, _e;
    return {
        openapi: '3.0.3',
        info: {
            title: (_b = (_a = config.swagger) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'NodeNet API',
            description: (_d = (_c = config.swagger) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : 'NodeNet server API',
            version: (_e = config.version) !== null && _e !== void 0 ? _e : '1.0.0',
        },
        servers: [
            {
                url: `${(0, models_1.getHost)(config)}:${config.port}`,
            },
        ],
    };
}
function getPaths(controllers) {
    var _a;
    const paths = {};
    for (const controllerName in controllers) {
        const controller = controllers[controllerName];
        if (controller.method === '[WS]')
            continue;
        if (!controller.path)
            continue;
        paths[controller.path] = {
            [swaggerMethods[controller.method]]: Object.assign(Object.assign({ description: (_a = controller.description) !== null && _a !== void 0 ? _a : controllerName }, getResponse()), getRequestBody(controller.method)),
        };
    }
    return { paths };
}
function getResponse() {
    return {
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
}
function getRequestBody(method) {
    if (method === '[PUT]' || method === '[POST]')
        return {
            requestBody: {
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
        };
    return {};
}
//# sourceMappingURL=swagger.creator.js.map