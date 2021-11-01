import React, { useRef, useEffect } from 'react'

import { Editor } from '@toast-ui/react-editor'
import uml from '@toast-ui/editor-plugin-uml'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

import chart from '@toast-ui/editor-plugin-chart'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'

import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'

import Prism from 'prismjs'
// https://github.com/PrismJS/prism/tree/gh-pages/components
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-c.min.js'
import 'prismjs/components/prism-cpp.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-diff.min.js'
import 'prismjs/components/prism-docker.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-tsx.min.js'

import {
  items,
  toggleFullScreen,
  previewStyleButton,
  darkMode
} from './toolbarItems'

import widgetRules from './widgetRules'
import customHTMLRenderer from './customHTMLRenderer'

const umlOptions = {
  rendererURL: 'https://www.plantuml.com/plantuml/svg/'
}

const chartOptions = {
  minWidth: 100,
  maxWidth: 500,
  minHeight: 100,
  maxHeight: 300
}

const makeFullScreenInBrowser = (editorRef) => {
  if (!editorRef || !editorRef.current) return

  const el = editorRef.current.getRootElement()

  if (el.style.height != '100vh')
    el.style =
      'height:100vh; width:100vw; position:fixed;z-index:100000;top:0px;left:0px;background-color:white;'
  else el.style = 'height:400px;'
}

const insertKatex = (editorRef) => {
  if (!editorRef || !editorRef.current) return
  editorRef.current.getInstance().insertText(`\n$$katex\n\n$$\n`)
}

const insertUML = (editorRef) => {
  if (!editorRef || !editorRef.current) return
  editorRef.current.getInstance().insertText(`\n$$uml\n\n$$\n`)
}

const insertInlineMath = (editorRef) => {
  if (!editorRef || !editorRef.current) return

  // get the selection range
  const [start, end] = editorRef.current.getInstance().getSelection()

  // get the selected text
  const selectedText = editorRef.current
    .getInstance()
    .getSelectedText(start, end)

  // replace the selection with the inline math text
  editorRef.current
    .getInstance()
    .replaceSelection(`$${selectedText}$`, start, end)
}

export default function MDE10({
  getMd,
  getTitle,
  getDescription,
  getHTML,
  uploadImage,
  initialValue,
  theme,
  initialEditType,
  previewStyleType,
  height,
  toolbarItems
}) {
  const editorRef = useRef(null)

  const toggleDarkMode = () => {
    let el = editorRef.current
      .getRootElement()
      .getElementsByClassName('toastui-editor-defaultUI')[0]
    if (el.classList.contains('toastui-editor-dark'))
      el.classList.remove('toastui-editor-dark')
    else el.classList.add('toastui-editor-dark')
  }

  const togglePreviewStyle = () => {
    const previewStyle = editorRef.current
      .getInstance()
      .getCurrentPreviewStyle()
    if (previewStyle === 'vertical')
      editorRef.current.getInstance().changePreviewStyle('tab')
    else editorRef.current.getInstance().changePreviewStyle('vertical')

    editorRef.current.getInstance().changeMode('markdown')
  }

  const getEmptyStringIfUndefined = (str) => {
    return str || ''
  }

  const mdChange = () => {
    getMd(
      getEmptyStringIfUndefined(
        editorRef?.current?.getInstance()?.getMarkdown()
      )
    )
    getTitle(
      getEmptyStringIfUndefined(
        editorRef?.current?.getRootElement().getElementsByTagName('h1')[0]
          ?.innerText
      )
    )
    getDescription(
      getEmptyStringIfUndefined(
        editorRef?.current?.getRootElement().getElementsByTagName('p')[0]
          ?.innerText
      )
    )

    getHTML(
      getEmptyStringIfUndefined(editorRef?.current?.getInstance().getHTML())
    )
  }

  useEffect(() => {
    const keyEventLitener = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        makeFullScreenInBrowser(editorRef)
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        insertKatex(editorRef)
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'U') {
        insertUML(editorRef)
      }
      if (e.altKey && e.key === 'm') {
        insertInlineMath(editorRef)
      }
    }

    document.body.addEventListener('keydown', keyEventLitener)

    return () => {
      document.body.removeEventListener('keydown', keyEventLitener)
    }
  }, [])

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue}
      previewStyle={previewStyleType}
      height={height}
      initialEditType={initialEditType}
      useCommandShortcut={true}
      theme={theme}
      widgetRules={widgetRules}
      onBlur={mdChange}
      autofocus={false}
      hooks={{
        addImageBlobHook: (blob, callback) => {
          uploadImage(blob)
            .then((url) => callback(url, 'Put alt text here...'))
            .catch((err) => {
              console.log(err)
              callback('Server error!', 'Directly paste image link.')
            })
          return false
        }
      }}
      toolbarItems={
        toolbarItems.length == 0
          ? [
              ...items,
              [
                {
                  el: toggleFullScreen(editorRef),
                  tooltip: 'Full Screen'
                },
                {
                  el: previewStyleButton(togglePreviewStyle),
                  tooltip: 'Preview Mode'
                },
                {
                  el: darkMode(toggleDarkMode),
                  tooltip: 'Dark Mode'
                }
              ],
              ['scrollSync']
            ]
          : toolbarItems
      }
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
  )
}

MDE10.defaultProps = {
  initialValue: '# Hi, i am  [Rahul](https://ats1999.github.io)',
  theme: 'dark',
  initialEditType: 'markdown',
  previewStyleType: 'vertical',
  height: '400px',
  toolbarItems: [],
  getMd: () => {},
  getTitle: () => {},
  getDescription: () => {},
  getHTML: (html) => {}
}
