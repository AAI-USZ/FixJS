function(eventName) {
	var args = [];
	for(var i = 1; i < arguments.length; i++)
		args[i-1] = arguments[i];
	var handled = false;
	var eventListeners = this.events[eventName];
	if(eventListeners != null){
		for(var i = 0; (i < eventListeners.length) && !handled; i++) {
			handled = this.events[eventName][i].method.apply(this.events[eventName][i].scope, args);
			if(handled == undefined)
				handled = false;
		}
	}
//#if DEBUG
	else{
		throw('Event \''+eventName+'\' not found on ' + this);
	}
//#end
	return handled;
}