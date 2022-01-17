function approve() {
	annehmen = true;
	changed = true;
	togglePopup('offer_approve', false);
	document.getElementById("state").innerHTML = "Angenommen (ungespeichert)";

}