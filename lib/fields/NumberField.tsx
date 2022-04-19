import { defineComponent, PropType } from "vue";

import { Schema, SchemaTypes, FiledPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (e: any) => {
      const value = e.target.value;
      const number = Number(value);
      // 逻辑校验
      if (Number.isNaN(number)) {
        props.onChange(undefined);
      } else {
        props.onChange(number);
      }
    };
    return () => {
      return <input type="number" value={props.value} onInput={handleChange} />;
    };
  },
});
