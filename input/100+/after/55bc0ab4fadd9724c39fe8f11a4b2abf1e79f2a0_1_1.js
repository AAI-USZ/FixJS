function show_notification_dialog(type, message) {
    noty({
	text: message,
        theme: 'noty_theme_twitter',
	timeout: 2000,
	type: type
    });
}