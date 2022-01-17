function showCodeList(target, list) {
	var $target = $(target);
	$target.empty();

	if (list.length == 0) {
		$target.text('None were reported.');
		return;
	}

	var ul = $('<ul />');

	for (var i = 0; i < list.length; i ++) {
		var code = list[i].code;
		var token = list[i].token;
		var li = $('<li />');
		var message = codeToMessage[code] || code;

		if (token) {
			message += " (" + token.type + ", line " + token.line + ", char " + token.charNum + ")";
		} else {
			message += " (no token supplied)";
		}

		li.text(message);
		ul.append(li);
	}

	$target.append(ul);
}