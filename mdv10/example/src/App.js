import React from 'react'

import V from 'mdv10';
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
import "mdv10/dist/toast.css";

const App = () => {
  return <V
    theme="dark"
    md = {`
# hello react editor world!

\`\`\`js
function jsFun(){
  return "Nothing..";
}
\`\`\`

<span style="color: #8b2f2f">This is the bold text</span>


\`\`\`jsx
<ReactChild>
  <Hi>
    <p style={{
      color:"red",
      padding:10
    }}>This is the text</p>
  </Hi>
</ReactChild>
\`\`\`

* [ ] chk1
* [x] chk2
* [ ] chk3

* a
* b


***
1. a
2. b
3. c

> Block quote


| h1 | h2 |
| --- | --- |
| This is  | Value |

[Link](Google)

\`React\`

$$katex
\\begin{array}{cc}
   a & b \\\\
   c & d
\\end{array}
$$

$$katex
\\def\\arraystretch{1.5}
   \\begin{array}{c:c:c}
   a & b & c \\\\ \\hline
   d & e & f \\\\
   \\hdashline
   g & h & i
\\end{array}
$$

This is inline $\\sum$ math
`}
  />
}

export default App
