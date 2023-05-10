# purin-pubsub

Only 1KB, TypeScript-friendly Publish/Subscribe library.

## Where to get

```sh
npm i purin-pubsub
```

## How to use

```ts
import { definePurinPubsub } from "purin-pubsub";

type YourData = {
  count: number;
};

const purin = definePurinPubsub<YourData>();

const unsubcribe = purin.subscribe("count", ({ key, value }) => {
  console.log(key, value); // echo: count 1

  // unsubscribe is also very simple! execute it, this function will not be executed
  unsubcribe();
});

purin.publish("count", 1);

// or you can arbitrarily retrieve the value of the last published value
console.log(purin.pull("count")); // echo: 1
```
