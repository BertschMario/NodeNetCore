import http from 'http';
import { WebSocket } from 'ws';
import { webSocketConnections, webSocketGroups } from '../../main';

type REQ = http.IncomingMessage;

export function getWebsocketFunctions(req: REQ, ws?: WebSocket) {
  if (!ws) return {} as any;
  const id = getRandomGuid();
  webSocketConnections[id] = ws;
  return {
    ws: {
      onMessage: (callback: (id: string, payload: any) => void) => {
        ws.on('message', (payload) => {
          callback(id, payload);
        });
      },
      onClose: (callback: (id: string) => void) => {
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

//External functions

/*Send message to a specific id*/
function sendTo(id: string, payload: any) {
  webSocketConnections[id]?.send(payload);
}

/*Send message to all users*/
function sendAll(payload: any) {
  Object.values(webSocketConnections).forEach((ws) => ws.send(payload));
}

/*Send message to all users except one id*/
function sendAllExcept(id: string, payload: any) {
  Object.values(webSocketConnections)
    .filter((ws) => ws !== webSocketConnections[id])
    .forEach((ws) => ws.send(payload));
}

/*Add id to a group*/
function addToGroup(groupName: string, id: string) {
  if (!webSocketGroups[groupName]) webSocketGroups[groupName] = [];
  webSocketGroups[groupName].push(id);
}

/*Send message to all users in a group*/
function sendToGroup(groupName: string, payload: any) {
  if (!webSocketGroups[groupName]) return;
  webSocketGroups[groupName].forEach((id) => webSocketConnections[id]?.send(payload));
}

/*Send message to all users in a group except one id*/
function sendToGroupExcept(groupName: string, id: string, payload: any) {
  if (!webSocketGroups[groupName]) return;
  webSocketGroups[groupName].filter((id) => id !== id).forEach((id) => webSocketConnections[id]?.send(payload));
}

/*Remove id from a group*/
function removeFromGroup(groupName: string, id: string) {
  if (!webSocketGroups[groupName]) return;
  webSocketGroups[groupName] = webSocketGroups[groupName].filter((groupId) => groupId !== id);
  if (webSocketGroups[groupName].length === 0) delete webSocketGroups[groupName];
}

//Internal functions
function removeIdFromEverything(id: string) {
  Object.keys(webSocketGroups).forEach((groupName) => removeFromGroup(groupName, id));
  delete webSocketConnections[id];
}

function getRandomGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
