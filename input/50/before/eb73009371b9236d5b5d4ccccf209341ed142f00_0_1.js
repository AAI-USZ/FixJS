function fmt_escape_html(txt) {
    return txt.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>')
        .replace(/\"/g, '&quot;');
}