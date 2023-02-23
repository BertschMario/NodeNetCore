"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const _utils_1 = require("../_utils");
const main_1 = require("../main");
function Database() {
    return function decorator(target) {
        const database = new target();
        if (!database.call)
            return _utils_1.Logger.error(`Database "${target.name}" does not have an call method`);
        if (!target.name.endsWith("Database"))
            return _utils_1.Logger.error(`Database name "${target.name}" does not end with Database`);
        main_1.databases[target.name] = database;
    };
}
exports.Database = Database;
//# sourceMappingURL=database.main.js.map