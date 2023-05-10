# pudding-pubsub

Only 1KB, TypeScript-friendly Publish/Subscribe library.

## Where to get

```sh
npm i pudding-pubsub
```

## How to use

```ts
import { definePuddingPubsub } from "./puddingpubsub";

type YourData = {
  count: number;
};

const pudding = definePuddingPubsub<YourData>();

pudding.subscribe("count", ({ key, value }) => {
  console.log(key, value); // echo: count 1
});

pudding.publish("count", 1);

// or you can arbitrarily retrieve the value of the last published value
console.log(pudding.pull("count")); // echo: 1
```
