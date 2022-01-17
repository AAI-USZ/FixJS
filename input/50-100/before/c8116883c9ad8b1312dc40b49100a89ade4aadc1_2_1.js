function reject(){
	annehmen=false;
	changed=true;
	togglePopup('offer_reject', false);
	document.getElementById("state").innerHTML = "Abgelehnt";
}