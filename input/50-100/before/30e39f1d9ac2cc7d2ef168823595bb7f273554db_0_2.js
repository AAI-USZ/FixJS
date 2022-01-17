function getCurrentCSS() {
        var theme =localStorage["color"];
        if(theme == undefined || theme == "themes/photon/css/red.css") {
        	$('.loadingIcon, .popupLoadingIcon').attr("src", "themes/photon/images/loading_red.gif");
        }
        else {
        	$('.loadingIcon, .popupLoadingIcon').attr("src", "themes/photon/images/loading_blue.gif");
        }
    }