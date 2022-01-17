function do_init_mouse_hover() {
    $(".details").hover(body_mouseenter, body_mouseleave)
    $(".edit").hide()
    $(".optional").hide()
    $(".edit_visible").show()
}