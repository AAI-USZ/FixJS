function hide_results() {
	var results = document.getElementById('result_list');
	CollapsibleLists.applyTo(results, true);
	// Hide all descriptions?
	var descriptions = results.getElementsByTagName('blockquote');
	for (var i = 0, len = descriptions.length; i < len; i++ ) {
			descriptions[i].style.display = 'none';
	}
}