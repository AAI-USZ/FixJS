function showErrorMsg(message) {
	var $msgDiv = $('#messageDiv');
	$msgDiv.html(message);
	$msgDiv.fadeIn("fast");
	setTimeout(function() {
		$msgDiv.fadeOut('fast');
		$msgDiv.html("");
	}, 3000);
}