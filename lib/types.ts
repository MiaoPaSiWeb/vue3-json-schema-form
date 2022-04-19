import {
  PropType,
  Ref,
  ComponentPublicInstance,
  ExtractPropTypes,
  VNodeChild,
} from "vue";
import { Options as AjvOptions } from "ajv";

import { JSONSchema6, JSONSchema7 } from "json-schema";

import { AjvFormat, AjvKeyword } from "./validator/types";
import { WidgetComponentDefine } from "./theme/utils";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

export interface VueJsonSchemaConfig {
  title?: string;
  descrription?: string;
  component?: string;
  options?: {
    [key: string]: any;
  };
  withFormItem?: boolean;
  widget?: "checkbox" | "textarea" | "select" | "radio" | "range" | string;
  items?: UISchema | UISchema[];
  propertiesOrder?: string[];
  controls?: {
    sortable?: boolean;
    removeable?: boolean;
    addable?: boolean;
  };
}

type SchemaRef = { $ref: string };

export interface Schema {
  enumNames?: (string | number)[];
  vjsf?: VueJsonSchemaConfig;
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema | { $ref: string };
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  required?: string[];
  enum?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export interface UISchema extends VueJsonSchemaConfig {
  properties?: {
    [property: string]: UISchema;
  };
}
// fix error TS2456: Type alias 'ErrorSchema' circularly references itself
interface ErrorSchemaObject {
  [level: string]: ErrorSchema;
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors: string[];
};

// 组件Props定义
export const CommonPropsDefine = {
  id: {
    type: String as PropType<string>,
    required: true,
  },
  path: {
    type: String as PropType<string>,
    required: true,
  },
  value: {
    required: true,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
  onChange: {
    type: Function as PropType<(value: any) => void>,
    required: true,
  },
  // requiredError: {
  //   type: Boolean as PropType<boolean>,
  //   required: true,
  // },
  required: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  isDependenciesKey: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
} as const;

export const CommonFieldPropsDefine = {
  ...CommonPropsDefine,
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
} as const;

// SchemaForm
declare type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance,
> = {
  new (): T;
};
export interface CustomFormat extends AjvFormat {
  component: ComponentPublicInstanceConstructor<
    ComponentPublicInstance<ExtractPropTypes<typeof CommonWidgetPropsDefine>>
  >;
}

export interface CustomKeyword extends AjvKeyword {
  transformSchema?: (originSchema: Schema) => Schema;
}
export interface JsonSchemFormPlugin {
  customFormats?: CustomFormat[] | CustomFormat;
  customKeywords?: CustomKeyword[] | CustomKeyword;
}

export interface WidgetOptions {
  enumOptions?: {
    key: string;
    value: string | number | boolean;
  }[];
  widget?: string | WidgetComponentDefine;
  disabled?: boolean;
  readonly?: boolean;
  // TODO: can be component
  description?: string | VNodeChild;
  multiple?: boolean;
}
export const CommonWidgetPropsDefine = {
  ...CommonPropsDefine,
  title: {
    type: String as PropType<string>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  options: {
    type: Object as PropType<WidgetOptions>,
    required: true,
  },
} as const;

export const SchemaFormPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
  },
  value: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
  },
  onChange: {
    type: Function as PropType<(value: any) => void>,
    required: true,
  },
  formProps: {
    type: Object as PropType<{ [key: string]: any }>,
  },
  plugins: {
    type: Array as PropType<JsonSchemFormPlugin[] | JsonSchemFormPlugin>,
  },
  locale: {
    type: String as PropType<string>,
    default: "zh",
  },
  ajvInstanceOptions: {
    type: Object as PropType<AjvOptions>,
  },
  /**
   * use this to provide owner `doValidate`
   */
  contextRef: {
    type: Object as PropType<Ref>,
  },
  customValidate: {
    type: Function as PropType<(data: any, errors: any) => void>,
  },
} as const;
