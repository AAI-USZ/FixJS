function getNextQuestions() {
		var paragraphs = [];
		var questions = [];
		
		while(questions.length < 2) {
			var articleIndex = Math.floor(Math.random() * articles.length);
			var paragraphIndex = Math.floor(Math.random() * articles[articleIndex].paragraphs.length);
			var paragraph = articles[articleIndex].paragraphs[paragraphIndex];
			
			// Make sure the paragraph is valid
			if(paragraph.viewed || paragraphs.indexOf(paragraph) != -1)
				continue;
				
			// Pick the first valid question for this paragraph
			for(var questionIndex in paragraph.questions) {
				if(!paragraph.questions[questionIndex].skipped) {
					paragraphs.push(articles[articleIndex].paragraphs[paragraphIndex]);
					questions.push(articles[articleIndex].paragraphs[paragraphIndex].questions[questionIndex]);
					break;
				}
			}
		}
		
		return questions;
	}