function buildQuestions() {
	if (exam != null) {
		$(exam.Question).each(function (index, question) {
			addQuestion(index,$('#questions'));
		});
	} else {
		alert("Empty exam");
	}
}