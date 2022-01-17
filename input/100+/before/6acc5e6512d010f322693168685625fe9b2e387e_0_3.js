function check() {
	// Hier die Werte auslesen:
	var pw = document.getElementById("newpasswort").value;
	var pww = document.getElementById("newpasswortwdh").value;
	
	if ((pw==""|| pw==null && pww=="" || pww==null) && (!document.getElementById("dataconfirm").checked) ){
		alert("Die Passwortfelder sind leer. Ihr altes Passwort wird beibehalten!");
	}
	if ((pw != null && pw != "") || (pww != null && pww != "")) {
		// Passwort soll geändert werden, also schauen ob sie gleich sind:
		if (pw != pww) {
			// Ja, es gab einen Fehler:
			// Denn Bentzer benachrichtigen:
			toggleWarning("error_unequalPasswords", true,
					"Passwörter sind nicht gleich!");
		}
		// ELSE brauchen wir wenn der Fehler schonmal aufgetreten ist aber jetzt
		// korrigiert wurde. Dann verstecken wir die (jetzt nicht mehr gültige)
		// Fehlermeldung wieder.
		else
			toggleWarning("error_unequalPasswords", false, "");
	}
	// Wenn es einen Fehler gab, den Benutzer die Eingaben kontrollieren lassen:

	// Ansonsten ist alles okay, also weiter:
	if (document.getElementById("dataconfirm").checked) {
		togglePopup("data_acc_del", true);

	}else if(pw==pww){
		changeAccount();
	}

}