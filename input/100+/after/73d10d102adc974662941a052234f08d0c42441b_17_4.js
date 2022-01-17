function () {
		var userCitation,
			userBibliography,
			timeout = 10;

		if (realTimeSearch) {
			timeout = 400;
		}		

		clearTimeout(styleFormatSearchTimeout);

		// clean the input in the editors
		userCitation = $("#userCitation").cleditor()[0].doc.body.innerHTML;
		userBibliography = $("#userBibliography").cleditor()[0].doc.body.innerHTML;

		$("#userCitation").cleditor()[0].doc.body.innerHTML = cleanInput(userCitation);
		$("#userBibliography").cleditor()[0].doc.body.innerHTML = cleanInput(userBibliography);

		$("#searchResults").html("<p><emp>Searching for styles...</emp></p>");

		styleFormatSearchTimeout = setTimeout(searchForStyle, timeout);
	}