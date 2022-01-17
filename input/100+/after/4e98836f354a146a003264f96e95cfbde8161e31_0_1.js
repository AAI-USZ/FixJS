function expr(token) {
    return '(function() { try { return ' + token + '; } catch(e) { return \'\'; } })()';
}