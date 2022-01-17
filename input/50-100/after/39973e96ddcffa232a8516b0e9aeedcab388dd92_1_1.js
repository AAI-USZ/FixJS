function allValidQuestionsAnswered() {
		for (var i=0; i<exam.Question.length;i++) {
			question = exam.Question[i];
			if (question.valid && !question.answered)
				return false;
		}
		return true;
	}