import { computed, defineComponent, PropType } from "vue";

import { Schema, SchemaTypes, CommonFieldPropsDefine } from "./types";
import {
  StringField,
  NumberField,
  ObjectField,
  // ArrayField,
  // BooleanField,
  UnsupportedField,
  // MultiSchemaField,
} from "./fields";
import { retrieveSchema } from "./utils";

export default defineComponent({
  name: "SchemaItem",
  props: CommonFieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    // 获取schema
    const schemaRef = computed(() => {
      return retrieveSchema(props.schema, props.rootSchema, props.value);
    });

    return () => {
      const { uiSchema } = props;
      const schema = schemaRef.value;

      if (!schema.type) {
        console.warn(`it's better to give every schema a type:`, schema);
      }

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
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
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
