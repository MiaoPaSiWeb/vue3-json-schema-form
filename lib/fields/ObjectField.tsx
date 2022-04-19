import { defineComponent, ref, Ref, computed, isReactive, isRef } from "vue";

import { CommonFieldPropsDefine } from "../types";
// import { isObject } from "../utils";
// import { useVJSFContext } from "../Context";
// import { useComponent, ThemeLayoutsNames } from "../theme";
// import { getUiSchema } from "./common";

export default defineComponent({
  name: "ObjectField",
  props: CommonFieldPropsDefine,
  setup(props) {
    // const { schema } = props;
    return () => {
      return <div>This is ObjectField</div>;
    };
  },
});
