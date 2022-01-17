function handleLoadMyApplicationResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "application/json") {
		// alert(data);
		// Erstelle Array aus JSON array:
		// var JSONarray = eval("("+data+")");
		// Get the table:
		var obj = eval("(" + data + ")");
		stupidThing = obj.author;
		var table = document.getElementById("applications");
		// Write table – probably replaces old data!
		table.innerHTML = "Bewerbung für " + obj.offerName
				+ (obj.status ? " – akzeptiert" : "") + ".";
		document.getElementById("descr").innerHTML = "<strong>Beschreibung:</strong><br>"
				+ obj.descr;
		if (obj.status) {
			selectDocuments();
		} else {
			var table2 = document.getElementById("applicationsTable");
			// Write table – probably replaces old data!
			table2.innerHTML = "<th>Bewerbung wurde noch nicht akzeptiert.</th>";
		}
	}
}