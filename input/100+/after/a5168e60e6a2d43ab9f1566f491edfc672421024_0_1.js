function (tab) {
    
    var hasTab = false;
    var tabMeta = mediaRequestsMap[tab.id];
    
    if (tabMeta) {
	hasTab = true;
    }
    
    if (hasTab) {
	var num = 0;
	var iter;
	for (iter in tabMeta) {
	    //skip the requestNum entry and iter through requests
	    if(iter !== "requestNum") {
		var requests = tabMeta[iter].requests;
		for (i in requests) {
		    num++
		}
	    }
	}
	mediaRequestsMap[tab.id].requestNum = num;
    }
    
    //debugging
    console.log(JSON.stringify(mediaRequestsMap));
}