import React, { useRef, useState } from "react";

import { Editor } from "@toast-ui/react-editor";
import uml from "@toast-ui/editor-plugin-uml";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import chart from "@toast-ui/editor-plugin-chart";

import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

import Prism from "prismjs";
// https://github.com/PrismJS/prism/tree/gh-pages/components
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-jsx.js";
// import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-javascript.min.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import {
  items,
  toggleFullScreen,
  previewStyleButton,
  darkMode
} from "./toolbarItems";

import widgetRules from "./widgetRules";
import customHTMLRenderer from "./customHTMLRenderer";

const umlOptions = {
  rendererURL: "https://www.plantuml.com/plantuml/svg/"
};

const chartOptions = {
  minWidth: 100,
  maxWidth: 500,
  minHeight: 100,
  maxHeight: 300
};


export default function MDE10({ getMd,
  getTitle,
  getDescription,
  getHTML,
  uploadImage,
  initialValue,
  theme,
  initialEditType,
  previewStyleType,
  height,
  toolbarItems }) {
  const editorRef = useRef(null);
  const [previewStyle, setPreviewStyle] = useState(previewStyleType);
  let previewStyleTab = false;

  const toggleDarkMode = () => {
    let el = editorRef.current.getRootElement().getElementsByClassName("toastui-editor-defaultUI")[0];
    if (el.classList.contains("toastui-editor-dark"))
      el.classList.remove("toastui-editor-dark");
    else el.classList.add("toastui-editor-dark");
  };

  const togglePreviewStyle = () => {
    setPreviewStyle(previewStyleTab ? "vertical" : "tab");
    previewStyleTab = !previewStyleTab;
  };

  const getEmptyStringIfUndefined = (str) => {
    return str || "";
  }

  const mdChange = () => {
    getMd && getMd(getEmptyStringIfUndefined(editorRef?.current?.getInstance()?.getMarkdown()));
    getTitle && getTitle(getEmptyStringIfUndefined(editorRef?.current?.getRootElement().getElementsByTagName('h1')[0]?.innerText));
    getDescription && getDescription(getEmptyStringIfUndefined(editorRef?.current?.getRootElement().getElementsByTagName('p')[0]?.innerText));
    getHTML && getHTML(getEmptyStringIfUndefined(editorRef?.current?.getRootElement().getElementsByClassName("toastui-editor-contents")[0].innerHTML));
  }

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue}
      previewStyle={previewStyle}
      height={height}
      initialEditType={initialEditType}
      useCommandShortcut={true}
      theme={theme}
      widgetRules={widgetRules}
      onChange={mdChange}

      hooks={{
        addImageBlobHook: (blob, callback) => {
          uploadImage(blob).then(url => callback(url, "Put alt text here...")).catch(err => {
            console.log(err);
            callback("Server error!", "Directly paste image link.")
          });
          return false;
        }
      }}

      toolbarItems={(toolbarItems.length == 0) ? [
        ...items,
        [
          {
            el: toggleFullScreen(editorRef),
            tooltip: "Full Screen"
          },
          {
            el: previewStyleButton(togglePreviewStyle),
            tooltip: "Preview Mode"
          },
          {
            el: darkMode(toggleDarkMode),
            tooltip: "Dark Mode"
          }
        ],
        ["scrollSync"]
      ] : toolbarItems}

      customHTMLRenderer={customHTMLRenderer}

      plugins={[
        [uml, umlOptions],
        colorSyntax,
        [chart, chartOptions],
        tableMergedCell,
        [codeSyntaxHighlight, { highlighter: Prism }]
      ]}

    // useDefaultHTMLSanitizer={false}
    />
  );
}

MDE10.defaultProps = {
  initialValue: "# Hi, i am  [Rahul](https://ats1999.github.io/)",
  theme: "dark",
  initialEditType: "markdown",
  previewStyleType: "vertical",
  height: "400px",
  toolbarItems: []
}
