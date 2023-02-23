"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.Logger = {
    error: (err) => {
        console.log("\x1b[31m%s\x1b[0m", "[Error] ", err);
    },
    success: (msg) => {
        console.log("\x1b[32m%s\x1b[0m", "[Success] ", msg);
    },
    info: (msg) => {
        console.log("\x1b[33m%s\x1b[0m", "[Info] ", msg);
    },
};
//# sourceMappingURL=logger.helper.js.map