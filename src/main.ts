import { createApp, defineComponent, h } from "vue";
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
  render() {
    return h("div", { id: "app" }, [
      /*
      Q:为什么这里直接src: "./assets/logo.png"，图片会出不来？
      在.vue文件中的template中使用相对路径，vue-loader会进行寻址，所有能正确加载图片
      这里应该更改引用方式：
        const img = require("./assets/logo.png");
      */
      h("img", { alt: "Vue logo", src: img }),
      h(HelloWorld, {
        msg: "Welcome to Your Vue.js + TypeScript App",
        age: 31,
      }),
    ]);
  },
});

createApp(App).mount("#app");
