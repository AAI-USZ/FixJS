function showWelcomeImage(key) {
    	var theme = localStorage[key];
    	if (theme == "themes/photon/css/blue.css") {
    		$("link[id='theme']").attr("href", localStorage["color"]);
    		$('.welcomeimg').attr("src", "images/welcome-photon_blue.png");
    		$('.phtaccinno').attr("src", "images/acceleratinginovation_blue.png");
    		$('.logoimage').attr("src", "images/photon_phresco_logo_blue.png");
    		$('.headerlogoimg').attr("src", "images/phresco_header_blue.png");
    	} else if(theme == null || theme == undefined || theme == "undefined" || theme == "null" || theme == "themes/photon/css/red.css") {
    		$("link[id='theme']").attr("href", "themes/photon/css/red.css");
    		$('.welcomeimg').attr("src", "images/welcome_photon_red.png");
    		$('.phtaccinno').attr("src", "images/acc_inov_red.png");
    		$('.logoimage').attr("src", "images/photon_phresco_logo_red.png");
    		$('.headerlogoimg').attr("src", "images/phresco_header_red.png");
    	}
    }