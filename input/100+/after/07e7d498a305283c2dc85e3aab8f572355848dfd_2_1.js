function questionSetAnswer(question_index, answer_index) {
		var question = exam.Question[question_index];
		question.answered = true;
		for (var i=0;i<question.Answer.length;i++) {
			if (i==answer_index)
				question.Answer[i].checked = true;
			else
				question.Answer[i].checked = false;
		}

		onAnswerChanged(question_index, answer_index);
		submitAnswer(exam.Question[question_index].id, exam.Question[question_index].Answer[answer_index].id);
		if (quickSolutionMode == true) {
			showSolution(question_index);
		}
	}