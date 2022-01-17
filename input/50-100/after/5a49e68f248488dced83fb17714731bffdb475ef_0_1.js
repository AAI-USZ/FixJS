function refresh_editionMode() {
    var value = get_editionMode()
    set_editionMode(value)
    $("#mode_edition").text(value)
    if (value == 'VISITE') {
        $(".edit").hide()
        $(".edit_visible").hide()
    } else if (value == 'EDITION') {
        //nothing to do
    } else if (value == 'NO MOVE') {
        $(".edit").show()
        $(".edit_visible").show()
        $(".optional").show()
    } else
        alert('unknown edition mode value: '+value)
}