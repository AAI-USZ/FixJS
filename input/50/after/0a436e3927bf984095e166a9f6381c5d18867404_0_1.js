function format_hour(date_obj) {
    // Format date_obj to HH:MM.
    return pad2(date_obj.getHours()) + ':' + pad2(date_obj.getMinutes());
}