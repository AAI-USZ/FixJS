function fmt_amqp_value(val) {
    if (val instanceof Array) {
        var val2 = new Array();
        for (var i = 0; i < val.length; i++) {
            val2[i] = fmt_amqp_value(val[i]);
        }
        return val2.join("<br/>");
    } else if (val instanceof Object) {
        return fmt_table_short(val);
    } else {
        var t = typeof(val);
        if (t == 'string') {
            return '<acronym class="type" title="string">' +
                fmt_escape_html(val) + '</acronym>';
        } else {
            return '<acronym class="type" title="' + t + '">' + val + '</acronym>';
        }
    }
}