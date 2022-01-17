function showQuestionDetails(question) {
	question.find('.answers').each(check);
	question.find('.comments').show();
	question.find('.materials').show('fast');
}