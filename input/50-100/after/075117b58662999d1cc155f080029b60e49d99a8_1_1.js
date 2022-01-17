function init (first) {
			disableDefaultKeys();
			bindKeypress();
		if (!first) {
			setLesson();	
		} else {
			var lang  = 'sample'
			level = 'level';
			training_text = lecture[ lang ][ level ].lesson;

			View.outputLesson(lecture[ lang ][ level ], lecture[ lang ].alphabet);
		}
	}