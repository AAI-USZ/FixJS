function showQuestion(index) {
		if (index >= exam.Question.length) {
			throw "Array Index out of bounds";
		}

		oldQuestionIndex = currentQuestionIndex;
		currentQuestionIndex = index;

		$('#question').empty();

		if (exam.Question[index].solved) {
			// must be defined in the respective layout-specific script file
			// (exam_mobile.js, exam_default.js)
			showQuestionSolved(index);
		} else {
			// must be defined in the respective layout-specific script file
			// (exam_mobile.js, exam_default.js)
			showQuestionUnsolved(index);
		}

		onQuestionShown(index, oldQuestionIndex);
	}