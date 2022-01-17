function forEachField(fields, wholeRows, func) {
    var prefix = (wholeRows ? "#id_" : "#row-"),
        id,
        field;

    for (id in fields) {
        for (field in fields[id]) {
            func($(prefix + fields[id][field]));
        }
    }
}