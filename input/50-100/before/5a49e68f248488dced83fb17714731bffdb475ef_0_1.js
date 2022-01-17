function refresh_editionMode() {
    value = get_editionMode()
    set_editionMode(value)
    $("#mode_edition").text(value)
    if (value == 'VISITE') {
        $(".edit").hide()
        $(".edit_visible").hide()
    } else if (value == 'EDITION') {
        
    } else
        alert('unknown edition mode value: '+value)
}