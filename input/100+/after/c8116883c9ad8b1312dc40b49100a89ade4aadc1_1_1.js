function handleLoadOffersResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "application/json") {
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// Get the table:
		var table = document.getElementById("offerTable");
		// Write table – probably replaces old data!
		table.innerHTML = "<tr><th>Start Datum</th><th>End Datum</th><th>Bezeichnung</th><th>Beschreibung</th></tr>";
		for ( var i = 0; i < JSONarray.length; i++) {
			table.innerHTML += "<tr class=\"\" id=\""
					+ JSONarray[i].aid
					+ "\"><td>"
					+ JSONarray[i].startdate
					+ "</td><td>"
					+ JSONarray[i].enddate
					+ "</td><td>"
					+ JSONarray[i].name
					+ "</td><td><div class=\"float2\">"
					+ JSONarray[i].description
					+ "</div><div class=\"float\"><input type=\"button\" value=\"Bewerben\"	onclick=\"prepareApply('"
					+ JSONarray[i].aid
					+ "')\" /> </div><div class=\"clear\"></div></td></tr>";
		}
		// loadMyOffers();
	}
}