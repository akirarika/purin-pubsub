type HandlerType<Key extends any = any, Value extends any = any> = (options: HandlerOptionsType<Key, Value>) => void;
type HandlerOptionsType<Key extends any, Value extends any> = { key: Key; value: Value };

export const definePurinPubsub = <PurinData extends Record<string, unknown>>() => {
  const values = new Map<string, unknown>();
  const handlers = new Map<HandlerType, string>();
  const indexeds = new Map<string, Set<HandlerType>>();

  const pp = {
    subscribe: <Key extends keyof PurinData, Handler extends HandlerType<Key, PurinData[Key]>>(key: Key, handler: Handler) => {
      handlers.set(handler, key as string);
      if (indexeds.has(key as string) === false) {
        indexeds.set(key as string, new Set());
      }
      const set = indexeds.get(key as string)!;
      set.add(handler);
      handlers.set(handler, key as string);

      return () => {
        // unsubcribe function
        handlers.delete(handler);
        set.delete(handler);
      };
    },
    publish: <Key extends keyof PurinData, Value extends PurinData[Key]>(key: Key, value: Value) => {
      const h = indexeds.get(key as string);

      if (h) {
        for (const handler of h) {
          handler({
            key: key as string,
            value: value,
          });
        }
      }
      values.set(key as string, value);
    },
    pull: (key: string) => {
      return values.get(key)!;
    },
  };

  return pp;
};
