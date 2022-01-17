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
			// Make mailto work:
			connect(
					"/hiwi/Applicant/js/getEmail",
					"user=" + stupidThing,
					function(mime, data) {
						if (mime == "text/url") {
							window.location = data;
						} else if (mime == "text/error") {
							alert(data);
						}
						// This is the case we want:
						else if (mime == "text/email") {
							var button = document
									.getElementById("mailToProvider");
							// Check mail address:
							// alert(data);
							// Note that clickMail() is defined in the
							// library.js!
							button
									.setAttribute(
											"onclick",
											"clickMail('"
													+ data
													+ "', '[Hiwi-Börse:"
													+ document
															.getElementById("applications").innerText
													+ "]')");
						}
					});
		}
	}
}