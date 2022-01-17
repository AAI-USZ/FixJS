function () {
		var userCitation,
			userBibliography;

		clearTimeout(styleFormatSearchTimeout);

		// clean the input in the editors
		userCitation = $("#userCitation").cleditor()[0].doc.body.innerHTML;
		userBibliography = $("#userBibliography").cleditor()[0].doc.body.innerHTML;

		$("#userCitation").cleditor()[0].doc.body.innerHTML = cleanInput(userCitation);
		$("#userBibliography").cleditor()[0].doc.body.innerHTML = cleanInput(userBibliography);

		styleFormatSearchTimeout = setTimeout(searchForStyle, 1000);
	}