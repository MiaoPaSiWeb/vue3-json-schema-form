import { Options, FormatDefinition, KeywordDefinition } from "ajv";
import { FormatValidator } from "ajv/dist/types";

export interface AjvFormat {
  name: string;
  definition: FormatValidator<string> | FormatDefinition<string>;
}

export interface AjvKeyword {
  name: string;
  definition: KeywordDefinition;
}

export interface CreateInstanceOptions {
  // locale?: string
  options?: Options;
  formats?: AjvFormat | AjvFormat[];
  keywords?: AjvKeyword | AjvKeyword[];
}

export interface ConstantCreateInstanceOptions extends CreateInstanceOptions {
  // locale: string
  options: Options;
  formats: AjvFormat[];
  keywords: AjvKeyword[];
}

export interface EnumKeyValueItem<V> {
  key: string;
  value: V;
}
