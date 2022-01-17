function (div, server, data_set_id, include_cross_hair, use_image_service) {
	// evaluate input and conduct peliminary checks
	
	if (typeof(div) != 'string' || $.trim(div) == '') {
		alert("Empty div ids are invalid!");
		return;
	}
	
	this.div = $("#" + div);
	if (this.div.length == 0) {
		alert("Given div id does not exist!");
		return;
	}
	
	if (typeof(server) != 'string' || $.trim(server) == '') {
		this.writeErrorMessageIntoDiv("Empty server name was given!");
		return;
	}
	this.domain = this.extractHostNameFromUrl(server);

	if (typeof(data_set_id) != 'number' || data_set_id <= 0) {
		this.writeErrorMessageIntoDiv("Data Set id has to be greater than 0!");
		return;
	}
	this.data_set_id = data_set_id;

	if (typeof(include_cross_hair) == 'string' && $.trim(include_cross_hair) != '' && $.trim(include_cross_hair) != 'false') {
		this.include_cross_hair = true;
	} else {
		this.include_cross_hair = false;
	}

	if (typeof(use_image_service) == 'string' && $.trim(use_image_service) != '' && $.trim(use_image_service) == 'true') {
		this.use_image_service = true;
	} else {
		this.use_image_service = false;
	}
	
	// check canvas support
	if (!this.supportsCanvas()) {
		this.writeErrorMessageIntoDiv("Sorry, your browser does not support the HTML 5 feature canvas");
		return;
	}
	
	// include the java script and css that is needed for the rest of the functionality
	this.includeJavaScriptAndCssNeeded();
	
	// load server configuration values needed
	this.loadDataBaseConfiguration();
	// load given data set configuration
	this.loadDataSetConfigurationFromServer();
	
	// this is for when the window dimensions & the div dimensions may change dynamically
	this.registerWindowResizeEvent();
}