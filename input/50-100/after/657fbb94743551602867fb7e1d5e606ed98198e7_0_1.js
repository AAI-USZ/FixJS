function escape_(s) {
    if (typeof s === 'undefined') {
        return;
    }
    return s.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;')
            .replace(/'/g, '&#39;').replace(/"/g, '&#34;');
}