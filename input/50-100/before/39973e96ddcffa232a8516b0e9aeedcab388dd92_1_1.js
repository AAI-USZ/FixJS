function allValidQuestionsAnswered() {
		for (question in exam.Question) {
			if (question.valid && !question.answered)
				return false;
		}
		return true;
	}