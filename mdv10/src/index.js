import React, { useRef, useState } from "react";

import { Viewer } from "@toast-ui/react-editor";
import uml from "@toast-ui/editor-plugin-uml";

import chart from "@toast-ui/editor-plugin-chart";

import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import Prism from "prismjs";
// https://github.com/PrismJS/prism/tree/gh-pages/components
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-cpp.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-diff.min.js";
import "prismjs/components/prism-docker.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-tsx.min.js";


import widgetRules from "./widgetRules";
import customHTMLRenderer from "./customHTMLRenderer";

import "./toast.css";


const umlOptions = {
  rendererURL: "https://www.plantuml.com/plantuml/svg/"
};


const chartOptions = {
  minWidth: 100,
  maxWidth: 500,
  minHeight: 100,
  maxHeight: 300
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
        [chart, chartOptions],
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
