import React, { useRef, useState } from "react";

import { Viewer } from "@toast-ui/react-editor";
import uml from "@toast-ui/editor-plugin-uml";

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
import widgetRules from "./widgetRules";
import customHTMLRenderer from "./customHTMLRenderer";

import "./toast.css";


const umlOptions = {
  rendererURL: "https://www.plantuml.com/plantuml/svg/"
};



export default function MdByteV({ theme,md }) {
  return (
    <Viewer
      initialValue={md}
      initialEditType="markdown"
      theme={theme}
      widgetRules={widgetRules}

      customHTMLRenderer={customHTMLRenderer}
      plugins={[
        [uml, umlOptions],
        chart,
        tableMergedCell,
        [codeSyntaxHighlight, { highlighter: Prism }]
      ]}
    />
  );
}

MdByteV.defaultProps = {
  theme:"dark",
  md:"# No Markdown!"
}

// mkdir node_modules/latex.js/dist/packages node_modules/latex.js/dist/documentclasses
