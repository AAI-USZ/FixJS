function (index, question) {
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
		}