function (query) {
    var s = '',
    i;
    for (i in query) {
        if (query.hasOwnProperty(i)) {
            s += (s.length === 0 ? '' : ' ') + i + ':"' + query[i] + '"';
        }
    }
    return qs.escape(s);
}