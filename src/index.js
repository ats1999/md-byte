import React, { useRef, useState } from "react";

import { Editor, Viewer } from "@toast-ui/react-editor";
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

import katex from 'katex';
import 'katex/dist/contrib/mhchem.js';
import { parse, HtmlGenerator } from 'latex.js';
import {
  items,
  toggleFullScreen,
  previewStyleButton,
  darkMode
} from "./toolbarItems";

import widgetRules from "./widgetRules";
import "./toast.css";

const previewStyle = "vertical";

const umlOptions = {
  rendererURL: "https://www.plantuml.com/plantuml/svg/"
};

export function MdByteV({ initialValue, theme }) {
  return <Viewer
    initialValue={initialValue}
    theme={theme}
  // widgetRules={widgetRules}
  // customHTMLRenderer={{
  //   latex(node) {
  //     console.log(node);
  //   },
  //   btex(node) {
  //     console.log(node);
  //   }
  // }}
  // plugins={[
  //   [uml, umlOptions],
  //   colorSyntax,
  //   chart,
  //   tableMergedCell,
  //   [codeSyntaxHighlight, { highlighter: Prism }]
  // ]}
  />
}

export function MdByteE({ getMd, getTitle, getDescription, getHTML, uploadImage }) {
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
      initialValue="# hello react editor world!"
      previewStyle={previewStyle}
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={true}
      theme={theme}
      widgetRules={widgetRules}
      onChange={mdChange}

      hooks={{
        addImageBlobHook: (blob, callback) => {
          uploadImage(blob).then(url => callback(url, "Put alt text here...")).catch(err => {
            console.log(err);
            callback("Try again", "Try again")
          });
          return false;
        }
      }}

      toolbarItems={[
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
      ]}
      customHTMLRenderer={{
        heading: (node, context) => {
          const { level } = node;
          const tagName = `h${level}`;
          let id = node.firstChild && node.firstChild.literal ? node.firstChild.literal : ""
          id = id.replace(/[^\w\s]/gi, " ")
            .trim()
            .replace(/ +/g, " ")
            .split(" ")
            .join("-")
            .toLocaleLowerCase();

          if (context.entering) {
            return {
              type: "openTag",
              tagName,
              attributes: {
                id: id
              }
            };
          }

          return {
            type: "closeTag", tagName,
            attributes: {
              id: id
            }
          };
        },
        link: (node, context) => {
          const { origin, entering } = context;
          const result = origin();
          if (entering && !result.attributes.href.startsWith("#")) {
            result.attributes.target = "_blank";
          }
          return result;
        },
        // with editor
        // https://codesandbox.io/s/damp-frog-nt1s8?file=/src/App.js
        // simple react
        // https://codesandbox.io/s/ecstatic-fast-f0mnb?file=/src/App.js:60-99
        
        katex(node) {
          let html;
          try{
            html = katex.renderToString(node.literal);
          }catch(e){
            html = `
            <pre>
            <code>${e}</code>
            </pre>
            `
          }
          return [
            { type: 'openTag', tagName: 'div', outerNewLine: true,classNames:["math-block"]},
            { type: 'html', content: html },
            { type: 'closeTag', tagName: 'div', outerNewLine: true }
          ];
        },
        latex(node) {
          let html;
          try{
            const generator = new HtmlGenerator({ hyphenate: false });
            const { body } = parse(node.literal, { generator }).htmlDocument();4
            html = body.innerHTML;
          }catch(e){
            html = `
            <pre>
            <code>${e}</code>
            </pre>
            `
          }

          return [
            { type: 'openTag', tagName: 'div', outerNewLine: true,classNames:["math-block"] },
            { type: 'html', content: html },
            { type: 'closeTag', tagName: 'div', outerNewLine: true }
          ];
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
