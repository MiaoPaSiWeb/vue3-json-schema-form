import { defineComponent, PropType } from "vue";

import { Schema, SchemaTypes, FiledPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    return () => {
      return <input type="number" />;
    };
  },
});
