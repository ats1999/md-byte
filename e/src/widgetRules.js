const reWidgetRule = /\[(@\S+)\]\((\S+)\)/;
const rules = [
    {
        // [@go](link)
        rule: reWidgetRule,
        toDOM(text) {
            const rule = reWidgetRule;
            const matched = text.match(rule);
            const span = document.createElement('span');

            span.innerHTML = `<a class="widget-anchor" href="${matched[2]}">${matched[1]}</a>`;
            return span;
        },
    },
]

export default rules;