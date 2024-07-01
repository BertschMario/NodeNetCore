"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsocketFunctions = void 0;
const main_1 = require("../../main");
function getWebsocketFunctions(req, ws) {
    if (!ws)
        return {};
    const id = getRandomGuid();
    main_1.webSocketConnections[id] = ws;
    return {
        ws: {
            onMessage: (callback) => {
                ws.on('message', (payload) => {
                    callback(id, payload);
                });
            },
            onClose: (callback) => {
                ws.on('close', () => {
                    removeIdFromEverything(id);
                    callback(id);
                });
                ws.on('error', () => {
                    removeIdFromEverything(id);
                    callback(id);
                });
            },
            getId: () => id,
            sendTo,
            sendAll,
            sendAllExcept,
            addToGroup,
            sendToGroup,
            sendToGroupExcept,
            removeFromGroup,
        },
    };
}
exports.getWebsocketFunctions = getWebsocketFunctions;
function sendTo(id, payload) {
    var _a;
    (_a = main_1.webSocketConnections[id]) === null || _a === void 0 ? void 0 : _a.send(payload);
}
function sendAll(payload) {
    Object.values(main_1.webSocketConnections).forEach((ws) => ws.send(payload));
}
function sendAllExcept(id, payload) {
    Object.values(main_1.webSocketConnections)
        .filter((ws) => ws !== main_1.webSocketConnections[id])
        .forEach((ws) => ws.send(payload));
}
function addToGroup(groupName, id) {
    if (!main_1.webSocketGroups[groupName])
        main_1.webSocketGroups[groupName] = [];
    main_1.webSocketGroups[groupName].push(id);
}
function sendToGroup(groupName, payload) {
    if (!main_1.webSocketGroups[groupName])
        return;
    main_1.webSocketGroups[groupName].forEach((id) => { var _a; return (_a = main_1.webSocketConnections[id]) === null || _a === void 0 ? void 0 : _a.send(payload); });
}
function sendToGroupExcept(groupName, id, payload) {
    if (!main_1.webSocketGroups[groupName])
        return;
    main_1.webSocketGroups[groupName].filter((id) => id !== id).forEach((id) => { var _a; return (_a = main_1.webSocketConnections[id]) === null || _a === void 0 ? void 0 : _a.send(payload); });
}
function removeFromGroup(groupName, id) {
    if (!main_1.webSocketGroups[groupName])
        return;
    main_1.webSocketGroups[groupName] = main_1.webSocketGroups[groupName].filter((groupId) => groupId !== id);
    if (main_1.webSocketGroups[groupName].length === 0)
        delete main_1.webSocketGroups[groupName];
}
function removeIdFromEverything(id) {
    Object.keys(main_1.webSocketGroups).forEach((groupName) => removeFromGroup(groupName, id));
    delete main_1.webSocketConnections[id];
}
function getRandomGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
//# sourceMappingURL=websocket.functions.js.map