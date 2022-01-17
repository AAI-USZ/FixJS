function(tabId, changeInfo, tab) {
	
	//inspect url change
	var tabMeteData = mediaRequestsMap[tabId];
	var inspectedURL = null;
	var key;
	for(key in tabMeteData) {
	    if(key !== "requestNum") {
		inspectedURL = key;
		break;
	    }	   
	}
	//wipe out previous meta if the url changes
	if(changeInfo.hasOwnProperty("url") 
	   && changeInfo.url !== inspectedURL) {
	    delete tabMeteData[inspectedURL];
	}
	
	updateMeta(tab,tabId);
	listUpdater(tab);
	
	//debugging
	console.log("Updated!");
	
    }