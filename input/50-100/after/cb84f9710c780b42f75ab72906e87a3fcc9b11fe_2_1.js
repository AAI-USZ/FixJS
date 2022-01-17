function()
	{
		clearTimeout(codeTimeout);
		codeTimeout = setTimeout( function () {
			CSLEDIT.data.setCslCode(editor.getValue());
			CSLEDIT.citationEngine.runCiteprocAndDisplayOutput(
				$("#statusMessage"), $("#exampleOutput"),
				$("#formattedCitations"), $("#formattedBibliography"));
		}, 500);
	}