function checkButtonOne() {
	if (!changed)
		togglePopup('offer_reject', true);
	else if (!annehmen) {
		changed = false;
		document.getElementById("state").innerHTML = "Ungeprüft";
	} else {
		togglePopup('offer_reject', true);
	}
}