function (eventObject) {
		if (shortcuts_enabled) {
			switch(eventObject.which) {
				case 37:
				case 38:
					showPreviousQuestion();
					return false;
				case 39:
				case 40:
					showNextQuestion();
					return false;
				case 13:
					showQuestionDetails($(".question.current"));
					/*if (confirm("Wirklich alle Lösungen anzeigen?")) {
						showAllQuestions();
						showAllSolutions();
						doStatistics();
					}*/
					return false;
					break;
				/*default:
					alert(eventObject.which);*/
			}
		}
	}