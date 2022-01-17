function handleEditOneOfferResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "application/json") {
		var offer = eval("(" + data + ")");
		var offertable = document.getElementById("offerinfotable");
		// TODO: Wieso wird hier die gesamte Tabelle in Strings gebaut wenn wir
		// einfach die Werte setzen könnten?
		var anbieternotiz = (offer.note == null || offer.note == "") ? "[Keine Notiz vorhanden.]"
				: offer.note;
		offertable.innerHTML = "<tr><td>Name des Veranstalters:</td>"
				+ "<td id=\"offerAuthor\">"
				+ offer.author
				+ "</td></tr>"
				+ "<tr><td>Titel der Stelle:</td>"
				+ "<td id=\"offerName\">"
				+ offer.name
				+ "</td></tr>"
				+ "<tr><td>Plätze:</td>"
				+ "<td>"
				+ offer.slots
				+ "</td></tr>"
				+ "<tr><td>Stunden die Woche:</td>"
				+ "<td><input id=\"inputhoursperweek\" type=\"text\" value=\""
				+ offer.hoursperweek
				+ "\" /> std. <div id=\"hours_error\"class=\"hiddenerror\"></div></td></tr>"
				+ "<tr><td>Lohn:</td>"
				+ "<td><input id=\"inputwage\" type=\"text\" value=\""
				+ offer.wage
				+ "\" />€ <div id=\"gage_error\"class=\"hiddenerror\"></div></td></tr>"
				+ "<tr><td>Anbieternotiz:</td>"
				+ "<td style=\"background-color: lightgray;\">"
				+ anbieternotiz
				+ "</td></tr>"
				+ "<tr><td>Status:</td><td id=\"state\">"
				+ "Ungeprüft"
				+ "</td></tr>";
		document.getElementById("dokumentloeschenbutton").disabled = "disabled";
		documentsFromOffer();
	} else if (mime == "text/error") {
		alert(data);		
	}
}