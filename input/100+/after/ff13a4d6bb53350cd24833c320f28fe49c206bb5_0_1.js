function angebotspeichern() {
	var aid = getURLParameter("AID");
	var hoursperweek = document.getElementById("inputhoursperweek").value;
	var wage = document.getElementById("inputwage").value;
	var startDate = document.getElementById("startDate").value;
	var endDate = document.getElementById("endDate").value;

	var error = false;

	if (hoursperweek == null || hoursperweek == "") {
		toggleWarning("hours_error", true, "Bitte ausfüllen!");
		error = true;
	} else if (!checkInt(hoursperweek)) {
		toggleWarning("hours_error", true, "Bitte eine ganze Zahl angeben!");
		error = true;
	} else
		toggleWarning("hours_error", false, "");
	if (startDate == null || startDate == "") {
		toggleWarning("error_startDate", true, "Bitte ausfüllen!");
		error = true;
	} else if (!checkDate(startDate)) {
		toggleWarning("error_startDate", true, "Ungültiges Datumsformat: DDMMYYYY mit Trennzeichen - . oder / ist erlaubt.");
		error = true;
	}  else{
		toggleWarning("error_startDate", false, "");
		startDate=unifyDate(startDate);
	}	
	if (endDate == null || endDate == "") {
		toggleWarning("error_endDate", true, "Bitte ausfüllen!");
		error = true;
	} else if (!checkDate(endDate)) {
		toggleWarning("error_endDate", true, "Ungültiges Datumsformat: DDMMYYYY mit Trennzeichen - . oder / ist erlaubt.");
		error = true;
	} else{
		toggleWarning("error_endDate", false, "");
		endDate=unifyDate(endDate);
	}	
	if (wage == null || wage == "") {
		toggleWarning("gage_error", true, "Bitte ausfüllen!");
		error = true;
	} else if (!checkFloat(wage)) {
		toggleWarning("gage_error", true, "Bitte eine Zahl angeben!");
		error = true;
	} else {
		toggleWarning("gage_error", false, "");
		wage = wage.replace(",", ".");
	}
	if (error)
		return;
	connect("/hiwi/Clerk/js/saveOffer", "aid=" + aid + "&hoursperweek="
			+ hoursperweek + "&wage=" + wage + "&startDate=" + startDate
			+ "&endDate=" + endDate + "&changed=" + changed + "&annehmen="
			+ annehmen, gotoOfferManagement);
}