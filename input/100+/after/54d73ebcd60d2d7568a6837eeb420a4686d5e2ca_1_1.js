function($){
	
	Event = function() {
	    this._observers = [];
	}
	
	Event.prototype = {
	    raise: function(data) {
	        for (var i in this._observers)
	        {
	            var item = this._observers[i];
	            item.observer.call(item.context, data);
	        }
	    },
	
	    subscribe: function(observer, context) {
	        var ctx = context || null;
	        this._observers.push({ observer: observer, context: ctx });
	    },
	
	    unsubscribe: function(observer, context) {
	        for (var i in this._observers)
	            if ( this._observers[i].observer == observer &&
	                 this._observers[i].context == context )
	                    delete this._observers[i];
	    }
	};
	
	var
		_eventsArray = new Array,

		_bindEvent = function(eventName, callbackFunction, context)
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
		},

		_unbindEvent = function(eventName, callbackFunction, context)
		{
			if(_eventsArray[eventName] !== undefined) {
				_eventsArray[eventName].unsubscribe(callbackFunction, context);
			}
			return this;
		},

		_triggerEvent = function(eventName, eventData)
		{
		    if(App.Settings.Debug.enabled) {
    		    console.log( 'Trigged: ' + eventName + ', with event data: ' + (eventData == undefined ? 'no data' : stringify(eventData)) );
    		}
    		
    		var moduleID = eventName.split(':')[0],
    		    modulesCache = App.Modules.RunningModules();

            if (moduleID == 'UI') {
                _eventsArray[eventName].raise(eventData);
                return this;
            }

            if(modulesCache[moduleID] === undefined) {
                App.Modules.Get(moduleID).done(function() {
                    if(_eventsArray[eventName] !== undefined) {
                        _eventsArray[eventName].raise(eventData);
                    }
                });
            } else {
                if(_eventsArray[eventName] !== undefined) {
                    _eventsArray[eventName].raise(eventData);
                }
            }

			return this;
		},

		_getRespondersByEventName = function(eventName)
		{
            for(var i in _eventsArray[eventName]._observers)
            {
                var item = _eventsArray[eventName]._observers[i];
                console.log(item.observer.toString());
            }
		};

	return {
		bind: _bindEvent,
		unbind: _unbindEvent,
		trig: _triggerEvent,
		eventResponders: _getRespondersByEventName
	}
	
}