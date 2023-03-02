export type ServerConfig = {
  name: string;
  port: number;
  host?: string;
  version?: string;
  swagger?: {
    port: number;
    path: string;
    title?: string;
    description?: string;
  };
};

export function getHost(config: ServerConfig) {
  return config.host ?? 'http://localhost';
}
