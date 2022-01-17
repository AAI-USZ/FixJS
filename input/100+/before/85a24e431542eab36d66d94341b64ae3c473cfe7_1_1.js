function getNextQuestions() {
		var questions = [];
		while(questions.length < 2) {
			var articleIndex = Math.floor(Math.random() * articles.length);
			var paragraphIndex = Math.floor(Math.random() * articles[articleIndex].paragraphs.length);
			var paragraph = articles[articleIndex].paragraphs[paragraphIndex];
			if(paragraph.questions.length == 0)
				continue;
			
			var questionIndex = Math.floor(Math.random() * articles[articleIndex].paragraphs[paragraphIndex].questions.length);
			if(!paragraph.viewed && !questions.skipped && questions.indexOf(articles[articleIndex].paragraphs[paragraphIndex].questions[questionIndex]) == -1)
				questions.push(articles[articleIndex].paragraphs[paragraphIndex].questions[questionIndex]);
		}
		return questions;
	}