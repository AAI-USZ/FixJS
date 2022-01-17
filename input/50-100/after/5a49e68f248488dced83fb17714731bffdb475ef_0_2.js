function do_init_mouse_hover() {
    $(".details").hover(body_mouseenter, body_mouseleave)
    var value = get_editionMode()
    if (value != 'NO MOVE') {
        $(".edit").hide()
        $(".optional").hide()
    }
    $(".edit_visible").show()
}