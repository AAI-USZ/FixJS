function handleLoadMyOffersResponse(mime, data) {
	// alert("ohne alert funzt es ned =(");
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "myapplication/json") {
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// Get the table:
		var table2 = document.getElementById("myofferTable");
		// Write table – probably replaces old data!
		table2.innerHTML = "<tr><th>Beginn</th><th>Bezeichnung</th><th>Beschreibung</th></tr>";
		for ( var i = 0; i < JSONarray.length; i++) {
			table2.innerHTML += "<tr class=\"\" id=\""
					+ JSONarray[i].aid
					+ "\"><td>"
					+ JSONarray[i].startdate
					+ "</td><td>"
					+ JSONarray[i].name
					+ "</td><td><div class=\"float2\">"
					+ JSONarray[i].description
					+ "</div><div class=\"float\"><input type=\"submit\" value=\"Bewerbung ansehen\" id=\""
					+ JSONarray[i].aid + "\"onclick=\"selectApplication2(\'"
					+ JSONarray[i].aid
					+ "\');\" \></div><div class=\"clear\"></div></td></tr>";
		} // �ber die onclick methode wird mit der id zur status.jsp weiter
		// geleitet
		loadOffers();
	}
}