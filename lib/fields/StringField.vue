<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script>
import { defineComponent } from "vue";
import { CommonFieldPropsDefine } from "../types";

export default defineComponent({
  name: "StringField",
  props: CommonFieldPropsDefine,
  setup(props) {
    const handleChange = (e) => {
      console.log(e.target.value);
      props.onChange(e.target.value);
    };

    return { handleChange };
  },
});
</script>
