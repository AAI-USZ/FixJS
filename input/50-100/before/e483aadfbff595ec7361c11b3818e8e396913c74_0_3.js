function() {
	$.app.delegate('uibutton', 'touchstart', function() {
		if ($(this).hasClass('disabled')) {
			return false;
		} else {
			$(this).UIHandleTouchState();
		}
	});
}