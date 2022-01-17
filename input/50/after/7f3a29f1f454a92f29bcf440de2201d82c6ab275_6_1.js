function () {
		var length = CSLEDIT.preGeneratedExampleCitations.exampleCitationsFromMasterId[defaultStyle].length;
		exampleIndex = (exampleIndex+length)%length;

		formatExampleDocument();
		clearResults();
	}