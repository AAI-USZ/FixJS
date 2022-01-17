function handleCreateOfferResponse(mime, data) {
	if (mime == "text/url") {
		window.location = data;
		return;
	} else if (mime == "text/error") {
		// TODO: hier fehler als html errormessage einbauen ?? Echt? Sind doch
		// alle da... (Tamino)
		// alert("HTML ERRORMESSAGE für die falscheingabe fehler!");
		alert(data);
		return;
	}
}