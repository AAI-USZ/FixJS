function GeolocationFeature(rpcHandler, connector) {
	GenericFeature.GenericFeature.call(this, rpcHandler);

	this.geo = new geolocation.Service(rpcHandler, { 'connector': connector} );
	this.api = NS;
	this.displayName = "GeolocationFeature" + this.id;
	this.description = 'Geolocation Feature.';
	this.ns = this.api;
	
	this.on('invoked-from-remote', function(featureInvoked, stanza) {
		logger.trace('on(invoked-from-remote)');
		logger.debug('The GeolocationFeature is invoked from remote. Answering it...');
		logger.debug('Received the following XMPP stanza: ' + stanza);
		
		var query = stanza.getChild('query');
		var params = query.getText();
		
		if (params == null || params == '') {
			params = "{}";
		} else {
			logger.trace('Query="' + params + '"');
		}
		
		var payload = JSON.parse(params);
		var conn = this.uplink;

		this.geo.getCurrentPosition(payload, function(result) {
			logger.debug("The answer is: " + JSON.stringify(result));
			logger.debug("Sending it back via XMPP...");
			conn.answer(stanza, JSON.stringify(result));
		});

		logger.trace('ending on(invoked-from-remote)');
	});

	this.on('invoked-from-local', function(featureInvoked, params, successCB, errorCB, objectRef) {
		logger.trace('on(invoked-from-local)');
		this.geo.getCurrentPosition(params, successCB, errorCB, objectRef);
		logger.trace('ending on(invoked-from-local)');
	});
		
	//TODO 'this' exposes all functions (and attributes?) to the RPC but only some a selection of features should be exposed.
	//TODO remote clients use the function 'invoke' to invoke the geolocation feature but it should also be possible to have other functions.
	//     at this time invoke is handled by the GenericFeature to dispatch the call locally or remotely.
	
	// We add the 'id' to the name of the feature to make this feature unique to the client.
	rpcHandler.registerObject(this);  // RPC name
}