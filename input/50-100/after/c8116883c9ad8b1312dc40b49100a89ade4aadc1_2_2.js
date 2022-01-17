function checkButtonTwo() {

	if (!changed) {
		togglePopup('offer_approve', true);
	} else if (annehmen) {
		changed = false;
		document.getElementById("state").innerHTML = "Ungeprüft";
	} else {
		togglePopup('offer_approve', true);
	}
}