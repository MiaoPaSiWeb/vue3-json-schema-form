import { createApp, defineComponent, h, reactive } from "vue";
// import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

// import img from "./assets/logo.png"; //这种ts校验不通过

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img = require("./assets/logo.png");
/*
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
  </div>
</template>
*/

const App = defineComponent({
  // setup 函数只会执行一次
  setup() {
    const stateRef = reactive({
      name: "PjssName",
    });

    setInterval(() => {
      stateRef.name += "1";
    }, 1000);

    return () => {
      return h("div", { id: "app" }, [
        h("img", { alt: "Vue logo", src: img }, []),
        h("p", stateRef.name),
        h(HelloWorld, {
          msg: "Welcome to Your",
          age: 12,
        }),
      ]);
    };
  },
});

createApp(App).mount("#app");
