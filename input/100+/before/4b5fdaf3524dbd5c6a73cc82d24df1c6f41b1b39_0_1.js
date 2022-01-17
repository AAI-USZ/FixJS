function handleLoadOffersResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "offer/json") {
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// Get the table:
		var table = document.getElementById("providerTable");
		// Write table – probably replaces old data!
		table.innerHTML = "<tr><th>Meine Stellenangebote:</th><th>Bewerber/Stelle</th><th>Aendern</th><th>Widerrufen</th></tr>";
		for ( var i = 0; i < JSONarray.length; i++) {
			table.innerHTML += "<tr class=\"\" id=\""
					+ JSONarray[i].aid
					+ "\"><td>"
					+ JSONarray[i].name
					+ "</td><td><br><input id=\""
					+ JSONarray[i].aid
					+ "\" type=\"button\" value=\"Bewerberauswahl\"  onclick=\"prepareButton(\'"
					+ JSONarray[i].aid
					+ "\');\"/></td><td><br><input type=\"submit\" value=\"Angebot aendern\" onclick=\"prepareButtonUpdateOffer(\'"
					+ JSONarray[i].aid
					+ "\');\"/></td><td><br><input type=\"button\" value=\"Angebot zurueckziehen\" onclick=\"prepareButtonDeleteOffer(\'"
					+ JSONarray[i].aid + "\');\" /> </td></tr>";
		}
	}
}