function fmt_maybe_wrap(txt, encoding) {
    if (encoding == 'string') return fmt_escape_html(txt);

    var WRAP = 120;
    var res = '';
    while (txt != '') {
        var i = txt.indexOf('\n');
        if (i == -1 || i > WRAP) {
            i = Math.min(WRAP, txt.length);
            res += txt.substring(0, i) + '\n';
            txt = txt.substring(i);
        }
        else {
            res += txt.substring(0, i + 1);
            txt = txt.substring(i + 1);
        }
    }
    return fmt_escape_html(res);
}