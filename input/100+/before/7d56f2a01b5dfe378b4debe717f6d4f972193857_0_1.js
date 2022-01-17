function updateFormDisplay(id, fields, excludeFields) {
    var type = $("#id_" + id)[0].value;

    for (var i in fields[prevTypes[id]]) {
        $("." + fields[prevTypes[id]][i]).hide();
    }

    for (var i in fields[type]) {
        $("." + fields[type][i]).show();
    }

    if (excludeFields) {
        for (var i in excludeFields) {
            $("." + excludeFields[i]).hide();
        }
    }

    prevTypes[id] = type;
}