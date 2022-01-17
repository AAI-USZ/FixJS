function create_sightingbasket() {
	try {
		/*
		// create the butterfly basket: 
		if(window.localStorage) {
			if(!window.localStorage.bf_basket) {
				window.localStorage.bf_basket = JSON.stringify([]);
				if(window.localStorage.length == 0) { throw "basketcreate_err"; }
				// .trigger('create') is needed in addition to .append() to apply the mobile styles to the new button:
				$("#startoptions").append("<p><a href='#' data-role='button' onclick='javascript:delete_basket();'>Delete basket</a><p/>").trigger('create');
			}
		} else {
			throw "locstor_err";
		}
		*/
	} catch(e) {
		var errormsg = "An error occurred while trying to create the butterfly basket.\n";
		if(e == "locstor_err") {
			errormsg += "Local storage isn't supported by your device.";
		} else if(e == "basketcreate_err") {
			errormsg += "The butterfly basket couldn't be created.";	
		} else {
			errormsg += "Error message: " + e.message;
		}
		alert(errormsg);
	}
}