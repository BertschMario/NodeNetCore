import { main } from '../main';

export function Module(...modules: any[]) {
  return function (target: any) {
    const instance = new target();
    main(instance?.config).then();
    if (instance.init) instance.init();
  };
}
