function() {
	backup();
	for (j = 0; j < dates.length; j++) {
		insertFields(dates[j]);
	}
	var querystring = location.search;
	if (querystring == '')
		return;
	var wertestring = querystring.slice(1);
	var paare = wertestring.split("&");
	var paar, name, wert;

	for ( var i = 0; i < paare.length; i++) {
		paar = paare[i].split("=");
		name = paar[0];
		wert = paar[1];
		name = unescape(name).replace("+", " ");
		wert = unescape(wert).replace("+", " ");
		this[name] = wert;
		if (document.getElementById(name) != null) {
			document.getElementById(name).value = wert;
		}
		if (name == 'year'){
			document.getElementById("endyear").value=wert;
		}
		if (name == 'month'){
			document.getElementById("endmonth").value=wert;
		}
		if (name == 'day'){
			document.getElementById("endday").value=wert;
		}
		if (name == 'week'){
			document.getElementById("endweek").value=wert;
		}
		if (name == 'id' && wert == 0){
			document.getElementById("Edittitle").innerHTML="Termin erstellen";
		}
		else {
			document.getElementById("Edittitle").innerHTML="Termin bearbeiten";
		}
	}
}