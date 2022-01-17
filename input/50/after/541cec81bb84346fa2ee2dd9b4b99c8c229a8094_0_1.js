function updateSearch() {
	var inputbox = document.getElementById("askQuestionInput");
	if (inputbox.value != prevSearchQuery) {
		prevSearchQuery = inputbox.value;
		changePage(0);
	}
}