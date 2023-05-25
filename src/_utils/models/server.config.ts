export type ServerConfig = {
  name: string;
  port: number;
  host?: string;
  version?: string;
  swaggerPath?: string;
  swaggerTitle?: string;
  swaggerDescription?: string;
  jwtSecret?: string;
};

export function getHost(config: ServerConfig) {
  return config.host ?? 'http://localhost';
}
