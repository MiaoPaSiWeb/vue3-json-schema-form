import {
  defineComponent,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  shallowRef,
  onBeforeMount,
} from "vue";

import * as Monaco from "monaco-editor";

import type { PropType, Ref } from "vue";
import { createUseStyles } from "vue-jss";

const useStyles = createUseStyles({
  container: {
    border: "1px solid #eee",
    dipslay: "flex",
    flexDirection: "column",
    borderRadius: 5,
  },
  title: {
    backgroundColor: "#eee",
    padding: "10px 0",
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
    minHeight: 400,
  },
});

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => any
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    console.log(
      "%c 🥛 props: ",
      "font-size:20px;background-color: #2EAFB0;color:#fff;",
      props,
    );
    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef();

    const containerRef = ref();
    let _subscription: Monaco.IDisposable | undefined;

    let __prevent_trigger_change_event = false; // eslint-disable-line

    onMounted(() => {
      //创建代码编辑器
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: "json",
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ));
      // 代码内容发生变化回调
      _subscription = editor.onDidChangeModelContent((event) => {
        console.log("-------->", __prevent_trigger_change_event);
        if (!__prevent_trigger_change_event) {
          // eslint-disable-line
          props.onChange(editor.getValue(), event);
        }
      });
    });

    onBeforeUnmount(() => {
      if (_subscription) {
        _subscription.dispose();
      }
    });

    // 监听器（props.code值发生变化后）
    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value;
        const model = editor.getModel();
        if (v !== model.getValue()) {
          editor.pushUndoStop();
          __prevent_trigger_change_event = true; // eslint-disable-line
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          );
          editor.pushUndoStop();
          __prevent_trigger_change_event = false; // eslint-disable-line
        }
      },
    );

    const classesRef = useStyles();

    return () => {
      const classes = classesRef.value;

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      );
    };
  },
});
