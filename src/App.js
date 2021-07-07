import { useRef, useState } from "react";
// core
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// import 'codemirror/lib/codemirror.css';
import { Editor } from "@toast-ui/react-editor";
import uml from "@toast-ui/editor-plugin-uml";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";

import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

import Prism from "prismjs";
//https://github.com/PrismJS/prism-themes/tree/master/themes
import "prismjs/themes/prism.css";
// https://github.com/PrismJS/prism/tree/gh-pages/components
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-jsx.js";
// import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-javascript.min.js";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import {
  items,
  toggleFullScreen,
  previewStyleButton,
  darkMode
} from "./toolbarItems";

import widgetRules from "./widgetRules";
import toolbarItems from "./toolbarItems";
import "./toast.css";

const previewStyle = "vertical";

const umlOptions = {
  rendererURL: "https://www.plantuml.com/plantuml/svg/"
};

export default function App() {
  const editorRef = useRef(null);
  const [previewStyle, setPreviewStyle] = useState("vertical");
  const [theme, setTheme] = useState("light");
  let darkModeOn = false;
  let previewStyleTab = false;

  const toggleDarkMode = () => {
    // setTheme(darkModeOn?"light":"dark");
    // darkModeOn = !darkModeOn;
    // console.log(editorRef.current.getRootElement().getElementsByClassName("toastui-editor-defaultUI")[0])
    let el = document.getElementsByClassName("toastui-editor-defaultUI")[0];
    if (el.classList.contains("toastui-editor-dark"))
      el.classList.remove("toastui-editor-dark");
    else el.classList.add("toastui-editor-dark");
  };

  const togglePreviewStyle = () => {
    setPreviewStyle(previewStyleTab ? "vertical" : "tab");
    previewStyleTab = !previewStyleTab;
  };
  return (
    <Editor
      ref={editorRef}
      initialValue="# hello react editor world!"
      previewStyle={previewStyle}
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={true}
      theme={theme}
      widgetRules={widgetRules}
      toolbarItems={[
        ...items,
        [
          {
            el: toggleFullScreen(editorRef),
            tooltip: "Toggle Full Screen"
          },
          {
            el: previewStyleButton(togglePreviewStyle),
            tooltip: "Preview Style"
          },
          {
            el: darkMode(toggleDarkMode),
            tooltip: "Preview Style"
          }
        ],
        ["scrollSync"]
      ]}
      customHTMLRenderer={{
        latex(node) {
          console.log(node);
        },
        btex(node) {
          console.log(node);
        }
      }}
      plugins={[
        [uml, umlOptions],
        colorSyntax,
        chart,
        tableMergedCell,
        [codeSyntaxHighlight, { highlighter: Prism }]
      ]}
    />
  );
}
