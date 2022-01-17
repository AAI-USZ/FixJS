function () {
		var length = exampleCitations.exampleCitationsFromMasterId[defaultStyle].length;
		exampleIndex = (exampleIndex+length)%length;

		formatExampleDocument();
		clearResults();
	}