import { main } from '../main';

export function Module(...modules: any[]) {
  return function (target: any) {
    const instance = new target();
    if (instance.init) instance.init().then();
    main(instance?.config).then();
  };
}
