function handleselectDocumentsResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "application/json") {
		// alert("richtig="+data);
		// data=[{"offerID":101,"documentID":2},{"offerID":101,"documentID":5}]
		// //richtig
		// Erstelle Array aus JSON array:
		var JSONarray = eval("(" + data + ")");
		// alert("data= "+JSONarray);
		// Get the table:
		var table2 = document.getElementById("applicationsTable");
		// Write table – probably replaces old data!
		table2.innerHTML = "<th>Status</th><th>Unterlage</th>";
		for ( var i = 0; i < JSONarray.length; i++) {
			var isChecked;
			if (JSONarray[i].isChecked == 0)
				isChecked = "Fehlt";
			else
				isChecked = "Vorhanden";
			table2.innerHTML += "<tr><td>" + isChecked + "</td><td>"
					+ JSONarray[i].name + "</td>";
		}
		// Prepare mailTo button:
		connect("/hiwi/Applicant/js/getEmail", "user=" + stupidThing, function(
				mime, data) {
			if (mime == "text/url") {
				window.location = data;
			} else if (mime == "text/error") {
				alert(data);
			}
			// This is the case we want:
			else if (mime == "text/email") {
				var button = document.getElementById("mailToProvider");
				// Check mail address:
				alert(data);
				// Note that clickMail() is defined in the library.js!
				button.setAttribute("onclick", "clickMail('" + data
						+ "', '[Hiwi-Börse:"
						+ document.getElementById("applications").innerText
						+ "]')");
			}
		});
	}
}