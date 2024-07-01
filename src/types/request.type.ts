import http from 'http';

// Short for http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }
export type RES = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage };
// Short for http.IncomingMessage
export type REQ = http.IncomingMessage;
