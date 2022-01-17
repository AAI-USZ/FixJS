function forEachField(fields, wholeRows, func) {
    var prefix = (wholeRows ? "#id_" : ".");

    for (var id in fields) {
        for (var field in fields[id]) {
            func($(prefix + fields[id][field]));
        }
    }
}