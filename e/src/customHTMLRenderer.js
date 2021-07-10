import katex from 'katex';
import 'katex/dist/contrib/mhchem.js';
import { parse, HtmlGenerator } from 'latex.js';
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
            html = katex.renderToString(node.literal);
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
            const { body } = parse(node.literal, { generator }).htmlDocument(); 4
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
    }
}

export default renderer;