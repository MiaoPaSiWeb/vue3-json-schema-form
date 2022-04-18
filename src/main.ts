import { createApp } from "vue";
import App from "./App";

createApp(App).mount("#app");

// vue-cli生成的项目，默认的入口文件是main.ts;  当改成main.tsx后会找不到这文件，导致编译错误
// 新建App.tsx文件，在里边写
