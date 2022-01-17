function ajax_error_handler(xhr, status ,ex) {
    var message = "Can't connect. reasons %{value}".replace('%{value}', ex);
    if (xhr.status == 401 || xhr.status == 403) {
	message = "Unauthorized!";
    }
    show_notification_dialog('error', message);
}