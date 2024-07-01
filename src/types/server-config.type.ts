export type ServerConfig = {
  name: string;
  port: number;
  host?: string;
  version?: string;
};

export function getHost(config: ServerConfig) {
  return config.host ?? 'http://localhost';
}
