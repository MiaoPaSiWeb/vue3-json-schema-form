<template>
  <div class="hello"></div>
  <span>{{ age }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const PropsType1 = {
  msg: String,
  age: Number,
  nameMSS: {
    type: String,
    required: true,
  },
};

const PropsType2 = {
  msg: String,
  age: Number,
  nameMSS: {
    type: String,
    required: true,
  },
} as const;

export default defineComponent({
  name: "HelloWorld",
  props: PropsType1,
  // props: PropsType2,
  mounted() {
    this.nameMSS;
    /*
     当props为 PropsType1 时，this.nameMSS打印如下，
     (property) nameMSS?: string | undefined

    但是 nameMSS属性required为true，它的类型应该固定的，即应该是string 而不是string 或 undefined

    Q:为什么会出现这种情况呢？
    props接收的是只读参数，而并没有上下文告诉我们 PropsType1 是只读的

    Q:如何解决呢？
    末尾加 ”as const“ 即可；参看PropsType2
     
    */
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
