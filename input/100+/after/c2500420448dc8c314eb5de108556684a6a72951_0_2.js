function handleLoadRepresentativesResponse(mime, data) {

	var repr = eval("(" + data + ")");

	if (mime == "text/url") {
		window.location = data;
	} else if (mime == "application/json") {
		var select = document.getElementById("selectStellvertreter");
		select.innerHTML = "<option value=\"null\"> keinen </option>";
		for ( var i = 0; i < repr.length; i++) {
			if (currentrepresentative == repr[i]) {
				select.innerHTML += "<option value=\"" + repr[i]
						+ "\" selected = \"selected\">" + repr[i] + "</option>";
			} else {
				select.innerHTML += "<option value=\"" + repr[i] + "\">"
						+ repr[i] + "</option>";
			}

		}
	}
}