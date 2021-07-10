import React, { useState, useEffect } from 'react'

import MdByteE from 'md-byte';
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

// theme 
//https://github.com/PrismJS/prism-themes/tree/master/themes
import "prismjs/themes/prism-okaidia.css";
import "katex/dist/katex.min.css";
import "md-byte/src/index.css";


import "./index.css";

/*
function MdByteV({ initialValue, theme }) {
  return <Viewer
    initialValue={initialValue}
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
}
*/
const App = () => {
  const [md, setMd] = useState(null);
  useEffect(() => {
    setMd(localStorage.md)
  }, [])
  // return <div>
  //   {md && <MdByteV
  //     initialValue={md}
  //     theme="dark"
  //   />}
  // </div>
  
  return <MdByteE
    getMd={(val) => localStorage.md = val}
  />
}

export default App
