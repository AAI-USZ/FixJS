function gotoOfferManagement(mime,data) {
	if (mime == "text/url") {
		window.location = data;
		return;
	} else if (mime == "text/error") {
		if (data == "invalid startDate"){
			toggleWarning("error_startDate", true, "Ungültiges Datum!");
		}else if(data== "invalid endDate"){
			toggleWarning("error_endDate", true, "Ungültiges Datum!");
		}else if(data == "order"){
			toggleWarning("error_startDate",true, "Enddatum liegt vor dem Startdatum!");
		}
		
		return;
	}
}