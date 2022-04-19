import { defineComponent, PropType } from "vue";

import { CommonFieldPropsDefine } from "../types";

export default defineComponent({
  name: "StringField",
  props: CommonFieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (e: any) => {
      console.log(e.target.value);
      props.onChange(e.target.value);
    };
    return () => {
      return <input type="text" value={props.value} onInput={handleChange} />;
    };
  },
});
