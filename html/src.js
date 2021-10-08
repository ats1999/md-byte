const { Parser, createRenderHTML } = require('@toast-ui/toastmark');

// ======================================================= //
// DEFINE CUSTOMS //
const customHTMLRenderer={
    heading: (node, context) => {
      const { level } = node;
      const tagName = `h${level}`;
      let id = node.firstChild && node.firstChild.literal?node.firstChild.literal:""
        id = id.replace(/[^\w\s]/gi, " ")
        .trim()
        .replace(/ +/g, " ")
        .split(" ").join("-");

      if (context.entering) {
        return {
          type: "openTag",
          tagName,
          attributes: {
            id: id
          }
        };
      }

      return { type: "closeTag", tagName,
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
    }
}


const baseConvertors = {
    paragraph(_, { entering, origin, options }) {
      // prevent paragraph from being removed when it's child of tight list item
      // to show highlight style in live-preview mode
      if (options.nodeId) {
        return {
          type: entering ? 'openTag' : 'closeTag',
          outerNewLine: true,
          tagName: 'p'
        };
      }
  
      return origin();
    },
  
    softbreak(node) {
      const isPrevNodeHTML = node.prev && node.prev.type === 'htmlInline';
      const isPrevBR = isPrevNodeHTML && /<br ?\/?>/.test(node.prev.literal);
      const content = isPrevBR ? '\n' : '<br>\n';
  
      return { type: 'html', content };
    },
  
    item(node, { entering }) {
      if (entering) {
        const attributes = {};
        const classNames = [];
  
        if (node.listData.task) {
          attributes['data-te-task'] = '';
          classNames.push('task-list-item');
          if (node.listData.checked) {
            classNames.push('checked');
          }
        }
  
        return {
          type: 'openTag',
          tagName: 'li',
          classNames,
          attributes,
          outerNewLine: true
        };
      }
  
      return {
        type: 'closeTag',
        tagName: 'li',
        outerNewLine: true
      };
    },
  
    code(node) {
      const attributes = { 'data-backticks': node.tickCount };
  
      return [
        { type: 'openTag', tagName: 'code', attributes },
        { type: 'text', content: node.literal },
        { type: 'closeTag', tagName: 'code' }
      ];
    },
  
    codeBlock(node) {
      const infoWords = node.info ? node.info.split(/\s+/) : [];
      const preClasses = [];
      const codeAttrs = {};
  
      if (node.fenceLength > 3) {
        codeAttrs['data-backticks'] = node.fenceLength;
      }
      if (infoWords.length > 0 && infoWords[0].length > 0) {
        const [lang] = infoWords;
  
        preClasses.push(`lang-${lang}`);
        codeAttrs['data-language'] = lang;
      }
  
      return [
        { type: 'openTag', tagName: 'pre', classNames: preClasses },
        { type: 'openTag', tagName: 'code', attributes: codeAttrs },
        { type: 'text', content: node.literal },
        { type: 'closeTag', tagName: 'code' },
        { type: 'closeTag', tagName: 'pre' }
      ];
    }
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
      Object.keys(customConvertors).forEach(nodeType => {
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
    convertors:getHTMLRenderConvertors(null,customHTMLRenderer)
});

const getHtml=(md)=>{
    const root = parser.parse(md);
    const html = renderHTML(root);
    return html
}

export const h = getHtml;