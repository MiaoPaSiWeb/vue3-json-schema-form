<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script>
import { defineComponent } from "vue";
import { CommonFieldPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: CommonFieldPropsDefine,
  setup(props) {
    const handleChange = (e) => {
      const value = e.target.value;
      const number = Number(value);
      // 逻辑校验
      if (Number.isNaN(number)) {
        props.onChange(undefined);
      } else {
        props.onChange(number);
      }
    };

    return { handleChange };
  },
});
</script>
