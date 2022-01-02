# ws-alert vue

A simple popup alert component for Vue.js.

## Installation
```shell
npm install ws-alert-vue
# OR
yarn add ws-alert-vue
```

In your `main.ts` file:
```typescript
import {createApp} from "vue";
const app = createApp(App);

// Import Css
import "ws-alert-vue/src/tailwind.css";
import WsAlertPlugin from "ws-alert-vue/plugin";

// Use Plugin
app.use(WsAlertPlugin);

app.mount("#app");
```

In your App.vue file.
```vue
<template>
  <WsAlert/>
  <!--  ... other components here ...-->
</template>
```