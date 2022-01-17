function DynMap(options) {
	var me = this;
	me.checkForSavedURL();
	me.options = options;
	$.getJSON(me.options.url.configuration, function(configuration) {
		if(configuration.error == 'login-required') {
			me.saveURL();
			window.location = 'login.html';
		}
		else if(configuration.error) {	
			alert(configuration.error);
		}
		else {
			me.configure(configuration);
			me.initialize();
		}
	}, function(status, statusMessage) {
		alert('Could not retrieve configuration: ' + statusMessage);
	});
}