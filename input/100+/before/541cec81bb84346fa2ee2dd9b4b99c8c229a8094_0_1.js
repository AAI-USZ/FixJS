function displayQuestions(searchType, page) {
	var searchQuery = "";
	prevSearchType = searchType;
	var questionList = document.getElementById("questionsList");
	rqra.searchSortedQuestions(searchQuery, searchType, page, function (data) {
		if (data && data.errorcode === 0 && data.questions.hits.length > 0) {
			displayTotal(data.questions.total);
			displayPageNumbers(data.questions.total);
			questionList.innerHTML = "";
			$.each(data.questions.hits, function (index, item) {
				questionList.innerHTML += formatQuestion(item);
			});
		}
	});
}