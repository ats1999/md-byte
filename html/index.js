const { Parser, createRenderHTML } = require("@toast-ui/toastmark");
const katex = require("katex");
require("katex/dist/contrib/mhchem.js");
// ======================================================= //

/**
 * Get  html repersentation of asci Tex
 * @param {String} str asci Tex
 * @returns {String} str html Tex
 */
function renderMath(str) {
  const html = katex.renderToString(str, {
    throwOnError: false,
    displayMode: true,
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
    if (nextIdx == -1 || prevIdx == -1) break;

    str = str.replace(
      str.substr(prevIdx, nextIdx - prevIdx + 1),
      renderMath(str.substr(prevIdx + 1, nextIdx - prevIdx - 1))
    );
    if (nextIdx !== -1) prevIdx = nextIdx + 1;
  }

  return str;
}

// DEFINE CUSTOMS //
const customHTMLRenderer = {
  text(node, context) {
    return {
      type: "html",
      content: getInlineMath(node.literal),
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
};

const baseConvertors = {
  paragraph(_, { entering, origin, options }) {
    // prevent paragraph from being removed when it's child of tight list item
    // to show highlight style in live-preview mode
    if (options.nodeId) {
      return {
        type: entering ? "openTag" : "closeTag",
        outerNewLine: true,
        tagName: "p",
      };
    }

    return origin();
  },

  softbreak(node) {
    const isPrevNodeHTML = node.prev && node.prev.type === "htmlInline";
    const isPrevBR = isPrevNodeHTML && /<br ?\/?>/.test(node.prev.literal);
    const content = isPrevBR ? "\n" : "<br>\n";

    return { type: "html", content };
  },

  item(node, { entering }) {
    if (entering) {
      const attributes = {};
      const classNames = [];

      if (node.listData.task) {
        attributes["data-te-task"] = "";
        classNames.push("task-list-item");
        if (node.listData.checked) {
          classNames.push("checked");
        }
      }

      return {
        type: "openTag",
        tagName: "li",
        classNames,
        attributes,
        outerNewLine: true,
      };
    }

    return {
      type: "closeTag",
      tagName: "li",
      outerNewLine: true,
    };
  },

  code(node) {
    const attributes = { "data-backticks": node.tickCount };

    return [
      { type: "openTag", tagName: "code", attributes },
      { type: "text", content: node.literal },
      { type: "closeTag", tagName: "code" },
    ];
  },

  codeBlock(node) {
    const infoWords = node.info ? node.info.split(/\s+/) : [];
    const preClasses = [];
    const codeAttrs = {};

    if (node.fenceLength > 3) {
      codeAttrs["data-backticks"] = node.fenceLength;
    }
    if (infoWords.length > 0 && infoWords[0].length > 0) {
      const [lang] = infoWords;

      preClasses.push(`lang-${lang}`);
      codeAttrs["data-language"] = lang;
    }

    return [
      { type: "openTag", tagName: "pre", classNames: preClasses },
      { type: "openTag", tagName: "code", attributes: codeAttrs },
      { type: "text", content: node.literal },
      { type: "closeTag", tagName: "code" },
      { type: "closeTag", tagName: "pre" },
    ];
  },
};

function getHTMLRenderConvertors(linkAttribute, customConvertors) {
  const convertors = { ...baseConvertors };

  if (linkAttribute) {
    convertors.link = (_, { entering, origin }) => {
      const result = origin();

      if (entering) {
        result.attributes = { ...result.attributes, ...linkAttribute };
      }
      return result;
    };
  }

  if (customConvertors) {
    Object.keys(customConvertors).forEach((nodeType) => {
      const orgConvertor = convertors[nodeType];
      const customConvertor = customConvertors[nodeType];

      if (orgConvertor) {
        convertors[nodeType] = (node, context) => {
          const newContext = { ...context };

          newContext.origin = () => orgConvertor(node, context);
          return customConvertor(node, newContext);
        };
      } else {
        convertors[nodeType] = customConvertor;
      }
    });
  }

  return convertors;
}

const parser = new Parser();
const renderHTML = createRenderHTML({
  gfm: true,
  convertors: getHTMLRenderConvertors(null, customHTMLRenderer),
});

const getHtml = (md) => {
  const root = parser.parse(md);
  const html = renderHTML(root);
  return html;
};

// export const h = getHtml;

module.exports = {
  h: getHtml,
};
