import { defineComponent, PropType } from "vue";

import { Schema, SchemaTypes, CommonFieldPropsDefine } from "./types";

import StringField from "./fields/StringField";
import NumberField from "./fields/NumberField";

export default defineComponent({
  name: "SchemaItem",
  props: CommonFieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    return () => {
      const { schema } = props;

      // TODO:如果type没有指定，我们需要猜测这个type
      const type = schema.type;

      let Component: any;

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        default: {
          console.warn(`${type} is not supported`);
          break;
        }
      }

      return <Component {...props} />;
    };
  },
});
