function addOffer(form) {
	if (form == null)
		return;
	var error = false;

	var titel = form.titel.value;
	if (titel == null || titel == "") {
		toggleWarning("error_titel", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkText(titel)) {
		toggleWarning("error_titel", true, "Unerlaubtes Sonderzeichen!");
	} else
		toggleWarning("error_titel", false, "");

	var std = form.std.value;
	if (std == null || std == "") {
		toggleWarning("error_std", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkInt(std)) {
		toggleWarning("error_std", true, "Bitte nur ganze Zahlen!");
		error = true;
	} else
		toggleWarning("error_std", false, "");

	var stellen = form.stellen.value;
	if (stellen == null || stellen == "") {
		toggleWarning("error_stellen", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkInt(stellen)) {
		toggleWarning("error_stellen", true, "Bitte nur ganze Zahlen!");
		error = true;
	} else
		toggleWarning("error_stellen", false, "");

	var startDate = form.startDate.value;
	if (startDate == null || startDate == "") {
		toggleWarning("error_startDate", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkText(startDate)) {
		toggleWarning("error_startDate", true, "Bitte nur ganze Zahlen!");
		error = true;
	} else
		toggleWarning("error_startDate", false, "");

	var endDate = form.endDate.value;
	if (endDate == null || endDate == "") {
		toggleWarning("error_endDate", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkText(endDate)) {
		toggleWarning("error_endDate", true, "Bitte nur ganze Zahlen!");
		error = true;
	} else
		toggleWarning("error_endDate", false, "");

	var beschreibung = form.beschreibung.value;
	if (beschreibung == null || beschreibung == "") {
		toggleWarning("error_beschreibung", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkText(beschreibung)) {
		toggleWarning("error_beschreibung", true, "Unerlaubtes Sonderzeichen!");
		error = true;
	} else {
		toggleWarning("error_beschreibung", false, "");
	}
	var notiz = form.notiz.value;
	if (notiz == null || notiz == "") {
		toggleWarning("error_notiz", true, "Bitte ausfuellen!");
		error = true;
	} else if (!checkText(notiz)) {
		toggleWarning("error_notiz", true, "Unerlaubtes Sonderzeichen!");
		error = true;
	} else
		toggleWarning("error_notiz", false, "");
	if (error)
		return;
	// alert("Sending...");
	connect("/hiwi/Provider/js/addOffer", "titel=" + titel + "&std=" + std
			+ "&stellen=" + stellen + "&beschreibung=" + beschreibung
			+ "&notiz=" + notiz + "&startDate=" + startDate + "&endDate="
			+ endDate, handleCreateOfferResponse);
}