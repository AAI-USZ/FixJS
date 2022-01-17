function fmt_escape_html(txt) {
    return fmt_escape_html0(txt).replace(/\n/g, '<br/>');
}