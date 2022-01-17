function runLoggingCallbacks(key, scope, args) {
	//debugger;
	var callbacks;
	if ( QUnit.hasOwnProperty(key) ) {
		QUnit[key].call(scope, args);
	} else {
		callbacks = config[key];
		for( var i = 0; i < callbacks.length; i++ ) {
			callbacks[i].call( scope, args );
		}
	}
}