function(eventName, callbackFunction, context)
		{
			if(App.Settings.Debug.enabled) {
    			console.log( 'Binded: ' + eventName + ', with responder: ' + callbackFunction.toString().substr(0, 100)+'...' );
			}
			
			var evt;
			if(_eventsArray[eventName] === undefined) {
				_eventsArray[eventName] = new Event();
			}
			evt = _eventsArray[eventName];
			evt.subscribe(callbackFunction, context);
			
			return this;
		}