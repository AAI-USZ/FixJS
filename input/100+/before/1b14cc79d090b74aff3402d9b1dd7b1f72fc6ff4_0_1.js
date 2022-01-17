function handleGlobalMessage(event) {
//	console.log("event "+event.name+" received");
	if (event.name ===  "canLoad") {

		var url=event.message;
		if (debug) {
			console.log("can load check " + url);
		}
		if(checkBlocked(url)===true){
			event.message = "block";
			console.log("blocking "+url+" with canLoad ");
		}else {
			event.message = "allow";
		}
	
	}


	if (event.name.indexOf(pckg) == 0) {

		var name = event.name.replace(pckg + ".", "");
		// console.log("event received: "+event.name+" ,"+name);
		switch (name) {
		case "GetBlockedRequest":
			var data = event.message;
			if (debug) {
				console.log("Get Block Request");
				console.log(data);
			}
			var result = checkBlocked(data);

			event.target.page.dispatchMessage(pckg + ".pageBlockAnswer", result);
			break;
		case "CloseActiveTabRequest":
			closeActiveTab();
			break;
		case "showPrefs":
			openPreferences();
			break;
		case "getPrefs":
			console.log("get prefs");
			event.target.page.dispatchMessage(pckg + ".getPrefsCallback", new Array(sitesToBlock[REGEX_IDX], sitesToBlock[DOMAIN_IDX]));
			break;
		case "savePrefs":
			console.log("save prefs");
			savePrefs(event.message);
			event.target.page.dispatchMessage(pckg + ".savePrefsCallback", "preferences saved!");
			break;
		// case "addRegex":
		// console.log("add regex");
		// addBlockedSiteRegex(event.message);
		// event.target.page.dispatchMessage(pckg+".addRegexCallback","regex
		// added!");
		// break;
		// case "addDomain":
		// console.log("add domain");
		// addBlockedSiteDomain(event.message);
		// event.target.page.dispatchMessage(pckg+".addDomainCallback","domain
		// or host added!");
		// break;
		}
	}
}