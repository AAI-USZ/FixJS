function (html) {
    html = JSONEditor.insertMissingEscapes(html);

    // BR DIV => DIV
    html = html.replace(/<br[^>]*>\s*<div>/g, '<div>');

    // DIV BR /DIV => \n
    html = html.replace(/<div>\s*(?:<br[^>]*>)?\s*<\/div>/g, '\\n');

    // strip trailing BR
    html = html.replace(/<br[^>]*>(\s*)$/, '$1');

    // BR /DIV => /DIV
    html = html.replace(/<br[^>]*>\s*<\/div>/g, '</div>');

    // place \n before line breaking HTML so typed line breaks get preserved
    html = html.replace(/(<(?:br|div))\b/g, '\\n$1');
    return html;
}