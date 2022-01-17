function handleLoadOffersResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "offer/json") {
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// Get the table:
		var table = document.getElementById("providerTable");
		// Write table – probably replaces old data!
		table.innerHTML = "<tr><th>Meine Stellenangebote:</th><th>Bewerber</th><th>Ändern</th><th>Widerrufen</th><th>Bestätigt?</th></tr>";
		for ( var i = 0; i < JSONarray.length; i++) {
			var obj = JSONarray[i];
			table.innerHTML += "<tr class=\"\" id=\""
					+ obj.aid
					+ "\"><td>"
					+ obj.name
					+ "</td><td><br><input id=\""
					+ obj.aid
					+ "OfferApplicants\" type=\"button\" value=\"Bewerberauswahl\"  onclick=\"prepareButton(\'"
					+ obj.aid
					+ "\');\"/></td><td><br><input type=\"submit\" value=\"Angebot aendern\" onclick=\"prepareButtonUpdateOffer(\'"
					+ obj.aid
					+ "\');\"/></td><td><br><input type=\"button\" value=\"Angebot zurueckziehen\" onclick=\"prepareButtonDeleteOffer(\'"
					+ obj.aid + "\');\" /> </td><td>"
					+ ((obj.checked) ? "Ja" : "Nein") + "</td></tr>";
			// Logic to disable button if not checked:
			if (!obj.checked) {
				document.getElementById(obj.aid + "OfferApplicants").disabled = true;
			}
		}
	}
}