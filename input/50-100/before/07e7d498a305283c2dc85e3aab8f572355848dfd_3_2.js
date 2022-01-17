function addQuestionCounter(el, className) {
	$('<div class="' + className + '"></div>')
		.append("Frage ")
		.append($('<span id="questions-answers-count">0</span>'))
		.append(" von ")
		.append($('<span id="questions-total-count">0</span>'))
		.appendTo($(el));
}