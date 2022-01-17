function fmt_table_short(table) {
    var res = '';
    for (k in table) {
        res += k + '=' + table[k] + '<br/>';
    }
    return res;
}