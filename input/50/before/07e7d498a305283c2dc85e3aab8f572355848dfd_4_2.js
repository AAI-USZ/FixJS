function showSolution() {
		exam.Question[currentQuestionIndex].solved = true;
		showQuestion(currentQuestionIndex);
		if (isQuestionAnsweredCorrectly(currentQuestionIndex)==0)
			$('#question-index-list #question-index-list-' + currentQuestionIndex).addClass('wrong');
	}