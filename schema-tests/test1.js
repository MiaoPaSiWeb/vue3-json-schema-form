const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// Error: unknown format “email” ignored in schema at path "#/properties/name"
// 想在当前的文件下使用format你就要把format引入进来，
// 你如果不引入就使用这个方法，文件是无法找到这个方法的，就会报这个错误。
// 解决方法是在使用这个方法的文件下，引入format。
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string", format: "email" },
    age: {
      type: "number",
      format: "qy", //****自定义***
    },
    name: {
      type: "string",
      test3: false,
    },
  },
};

//自定义 format
ajv.addFormat("qy", {
  type: "number", //输入类型必须是number
  validate: (x) => {
    return x > 5 ? true : false;
  },
});

// 关键字
// 关键字是3种类型
// 1、 "validate" function
// 2、 "compile" function
// 3、 "macro" function

// validate类型
ajv.addKeyword("test1", {
  validate(schema, data) {
    console.log("普通：", schema, data);
    if (schema === true) return true;
    else return data.length === 6;
  },
});

// compile类型
ajv.addKeyword("test2", {
  compile(sch, parentSchema) {
    console.log("compile：", sch, parentSchema);
    return (x) => {
      if (x.length === 6) {
        return true;
      } else {
        return false;
      }
    };
  },
});
// macro型
ajv.addKeyword("test3", {
  macro() {
    return {
      minLength: 10,
    };
  },
});

const validate = ajv.compile(schema);

const data = {
  foo: 1,
  bar: "abc@xxx.com",
  age: 10,
  name: "dfsd",
};

const valid = validate(data);
if (!valid) console.log(validate.errors);
