function showLoadingIcon(tagControl) {
		var src = "themes/photon/images/loading_blue.gif";
    	var theme =localStorage["color"];
        if (theme == undefined || theme == null || theme == "null" || theme == "" || theme == "undefined" || theme == "themes/photon/css/red.css") {
        	src = "themes/photon/images/loading_red.gif";
        }
     	tagControl.empty();
    	tagControl.html("<img class='loadingIcon' src='"+ src +"' style='display: block'>");
    }