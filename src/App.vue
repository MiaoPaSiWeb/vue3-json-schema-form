<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
    <p>countRef: {{ countRef }}</p>
    <p>nameRef : {{ nameRef }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    // ref实际返回的是一个 { value:xxx } 的结构对象，即每个ref都有一个value属性
    const countRef = ref(0);

    // computed
    const nameRef = computed(() => {
      return "Hello World" + countRef.value;
    });

    // watchEffect（监听器）
    watchEffect(() => {
      console.log(nameRef.value);
    });

    // setInterval(() => {
    //   countRef.value += 1;
    // }, 1000);

    return { countRef, nameRef };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
