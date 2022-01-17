function doStatistics() {
		var result = {
			total : exam.Question.length,
			answered : 0,
			valid : 0,
			correct_invalid : 0,
			correct_valid : 0
		};

		$(exam.Question).each(function (index, question) {
			var answers_marked_correct = 0;

			// if this question has been answered, increase the answered-count
			if (question.answered) {
				result.answered++;
			}

			if (question.valid) {
				result.valid++;
			}

			for (var i=0;i<question.Answer.length;i++) {
				if (question.Answer[i].checked && question.Answer[i].correct) {
					if (question.valid)
						result.correct_valid++;
					else
						result.correct_invalid++;
				}
			}
		});

		return result;
	}