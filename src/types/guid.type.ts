import * as crypto from 'node:crypto';

export type GUID =
  | `${string}-${string}-${string}-${string}-${string}`
  | `${number}-${number}-${number}-${number}-${number}`;

export const GUID = {
  empty: '00000000-0000-0000-0000-000000000000' as GUID,
  random: (): GUID => crypto.randomUUID(),
};
