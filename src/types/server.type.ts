import { REQ, RES } from './request.type';

// The object with many useful properties and methods for authentication
export type ServerAuth = {
  signToken: (payload: any, expiresInHours?: number) => Promise<string>;
  getAuthToken: () => Promise<string>;
  getAuthTokenObject: <T>() => Promise<T | null>;
};

// The websocket object with many useful properties and methods
export type ServerWebsocket = {
  onMessage: (callback: (id: string, payload: any) => void) => void;
  onClose: (callback: (id: string) => void) => void;
  getId: () => string;
  sendTo: (id: string, payload: any) => void;
  sendAll: (payload: any) => void;
  sendAllExcept: (id: string, payload: any) => void;
  addToGroup: (groupName: string, id: string) => void;
  sendToGroup: (groupName: string, payload: any) => void;
  sendToGroupExcept: (groupName: string, id: string, payload: any) => void;
  removeFromGroup: (groupName: string, id: string) => void;
};

// The main object with many useful properties and methods
export type Server = {
  req: REQ;
  res: RES;
  getBody: <T>() => Promise<T>;
  ok: (payload?: any) => Promise<any>;
  error: (payload?: any, code?: number) => Promise<any>;
  auth: ServerAuth;
  ws: ServerWebsocket;
};
