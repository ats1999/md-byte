import katex from 'katex';
import 'katex/dist/contrib/mhchem.js';
import { parse, HtmlGenerator } from 'latex.js';
import { mermaidAPI } from "mermaid";

/**
 * Get  html repersentation of asci Tex
 * @param {String} str asci Tex
 * @returns {String} str html Tex
 */
function renderMath(str) {
    const html = katex.renderToString(str, {
        throwOnError: false,
        displayMode: false
    });
    return html;
}

/**
 * Get html from the complete string
 * @param {String} str text
 * @returns {String} str rendered html combined with input
 */
function getInlineMath(str) {
    let prevIdx = 0;
    let nextIdx = -1;
    while (true) {
        prevIdx = str.indexOf("$", prevIdx);
        nextIdx = str.indexOf("$", prevIdx + 1);
        if (nextIdx == -1 || prevIdx == -1)
            break;

        str = str.replace(str.substr(prevIdx, nextIdx - prevIdx + 1), renderMath(str.substr(prevIdx + 1, nextIdx - prevIdx - 1)));
        if (nextIdx !== -1)
            prevIdx = nextIdx + 1;
    }

    return str;
}


const renderer = {
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
    text(node, context) {
        return {
            type: 'html',
            content: getInlineMath(node.literal)
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
        try {
            html = katex.renderToString(node.literal, {
                throwOnError: false,
                // displayMode:true
            });
        } catch (e) {
            html = `
        <pre>
        <code>${e}</code>
        </pre>
        `
        }
        return [
            { type: 'openTag', tagName: 'div', outerNewLine: true, classNames: ["math-block"] },
            { type: 'html', content: html },
            { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
    },
    latex(node) {
        let html;
        try {
            const generator = new HtmlGenerator({ hyphenate: false });
            const { body } = parse(node.literal, { generator }).htmlDocument();
            html = body.innerHTML;
        } catch (e) {
            html = `
        <pre>
        <code>${e}</code>
        </pre>
        `
        }

        return [
            { type: 'openTag', tagName: 'div', outerNewLine: true, classNames: ["math-block"] },
            { type: 'html', content: html },
            { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
    },
    mermaid(node) {
        let html = "";
        mermaidAPI.render("mermaid", node.literal, (h) => {
            html = h;
        })
        return [
            { type: 'openTag', tagName: 'div', outerNewLine: true, classNames: ["mermaid-block"] },
            { type: 'html', content: html },
            { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
    },

    htmlBlock: {
        iframe(node) {
            return [
                { type: 'openTag', tagName: 'iframe', outerNewLine: true, attributes: node.attrs },
                { type: 'html', content: node.childrenHTML },
                { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
            ];
        },
        details(node) {
            // return [
            //     { type: 'openTag', tagName: 'details', outerNewLine: true, attributes: node.attrs },
            //     { type: 'openTag', tagName: 'summary' },
            //     { type: "text", content: "This is custom" },
            //     { type: 'closeTag', tagName: 'summary' },
            //     { type: "text", content: "This is details" },
            //     { type: 'closeTag', tagName: 'details' },
            // ]
            return [
                // { type: 'openTag', tagName: 'details', outerNewLine: true, attributes: node.attrs },
                { type: 'html', content: node.childrenHTML },
                // { type: 'closeTag', tagName: 'details', outerNewLine: true },
            ];
        }
    }
}

export default renderer;
