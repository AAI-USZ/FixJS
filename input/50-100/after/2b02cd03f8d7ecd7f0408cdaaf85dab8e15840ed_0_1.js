function showMsg(color, message) {
	var $msgDiv = $('#messageDiv');
	$msgDiv.addClass(color);
	$msgDiv.html(message);
	$msgDiv.fadeIn("fast");
	setTimeout(function() {
		$msgDiv.fadeOut('fast');
		$msgDiv.html("");
		$msgDiv.removeClass(color);
	}, 3000);
}