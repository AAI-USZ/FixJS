function updateFormDisplay(id, fields) {
    var type = $("#id_" + id)[0].value,
        i;

    for (i in fields[prevTypes[id]]) {
        $("#row-" + fields[prevTypes[id]][i]).hide();
    }

    for (i in fields[type]) {
        $("#row-" + fields[type][i]).show();
    }

    prevTypes[id] = type;
}