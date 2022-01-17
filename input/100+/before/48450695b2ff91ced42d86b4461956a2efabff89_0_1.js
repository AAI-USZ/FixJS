function hideAllToolsFields() {
    var fields = TOOLS_FIELDS["none"];

    for (i = 0; i < fields.length; i++) {
        $("#row-" + fields[i]).hide();
    }
}