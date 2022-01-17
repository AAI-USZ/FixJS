function showSolution(index) {
		exam.Question[index].solved = true;
		showQuestion(index);
		if (isQuestionAnsweredCorrectly(index)==0)
			$('#question-index-list #question-index-list-' + index).addClass('wrong');
	}