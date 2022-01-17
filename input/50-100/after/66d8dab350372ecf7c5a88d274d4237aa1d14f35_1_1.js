function () {
	console.log("Connection terminated.");
	// remove dead connection object
	Client.connection = null;
	
	jQuery('#buttonbar').find('input').attr('disabled', 'disabled');
    jQuery('#console_input').addClass('disabled').attr('disabled', 'disabled');
	document.body.style.cursor = "auto";
}