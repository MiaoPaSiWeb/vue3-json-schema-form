import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
  withModifiers,
} from "vue";

import HelloWorld from "./components/HelloWorld.vue";

const img = require("./assets/logo.png"); // eslint-disable-line

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />;
}

export default defineComponent({
  setup() {
    const state = reactive({
      name: "Helow",
      message: "",
    });

    const countRef = ref(0);

    setInterval(() => {
      state.name += "1";
      countRef.value += 1;
    }, 1000);

    return () => {
      const count = countRef.value;

      console.log(state.message + "--------");
      return (
        <div id="app">
          <img alt="Vue logo" src={img} />
          <p>{state.name + count}</p>
          <input type="text" v-model={state.message} />
          {renderHelloWorld(13)}
        </div>
      );
    };
  },
});
