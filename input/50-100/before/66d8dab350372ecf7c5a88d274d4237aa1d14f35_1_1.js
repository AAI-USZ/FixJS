function () {
	console.log("Connection terminated.");
	// remove dead connection object
	Client.connection = null;
	
	jQuery('.button').attr('disabled', 'disabled');
    jQuery('#input').addClass('disabled').attr('disabled', 'disabled');
	document.body.style.cursor = "auto";
}