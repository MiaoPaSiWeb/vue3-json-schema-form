import { defineComponent, PropType } from "vue";

import { Schema, SchemaTypes } from "../types";

export default defineComponent({
  name: "NumberField",
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props, { slots, emit, attrs }) {
    return () => {
      const schema = props.schema;
      const type = schema?.type;
      switch (type) {
        case SchemaTypes.STRING: {
          return <input type="number" />;
        }
        default:
          break;
      }
      return <div>This is a form</div>;
    };
  },
});
