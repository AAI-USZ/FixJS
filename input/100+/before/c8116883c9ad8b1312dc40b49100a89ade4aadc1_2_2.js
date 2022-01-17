function handledocumentsFromOfferResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "documentsoffer/json") {
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// Get the table:
		var table = document.getElementById("documentsTable");
		// Write table – probably replaces old data!
		table.innerHTML = "<tr><th>Benoetigte Documente</th></tr>";
		for ( var i = 0; i < JSONarray.length; i++) {
			table.innerHTML += "<tr class=\"\" id=\"" + JSONarray[i].uid
					+ "\" onclick=\"markDocumentSelected(\'" + JSONarray[i].uid
					+ "\');\"><td>" + JSONarray[i].name + "</td></tr>";
		}
		// Zum Laden des DropDown-Menues des Pop-Ups bei "Dokument Hinzufuegen"
		var aid = getURLParameter("AID");
		connect("/hiwi/Clerk/js/documentsToAddToOffer", "aid=" + aid,
				handledocumentsToAddToOfferResponse);
	}
}