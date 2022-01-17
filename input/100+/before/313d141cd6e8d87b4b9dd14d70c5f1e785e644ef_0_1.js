function(elmt, name, splitOn) {
    var value, i, values;

    try {
        value = $(elmt).attr(name);
        if (typeof value === "undefined" || value === null || value.length === 0) {
            value = $(elmt).data("ex-"+name);
            if (typeof value === "undefined" || value === null || value.length === 0) {
                return null;
            }
        }
        if (typeof splitOn === "undefined" || splitOn === null) {
            return value;
        }
        values = value.split(splitOn);
        for (i = 0; i < values.length; i++) {
            values[i] = values[i].trim();
        }
        return values;
    } catch(e) {
        return null;
    }
}