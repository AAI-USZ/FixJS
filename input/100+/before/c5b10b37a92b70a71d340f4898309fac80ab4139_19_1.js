function emit(e, eventName){
	var afterCallbacks = []
		
	var args = Array.prototype.slice.call(arguments, 2)
	
	if(this.onListeners && this.onListeners[eventName]){
		this.onListeners[eventName].forEach(function(cb){
			var af = cb.apply(undefined, args)
			if(af) afterCallbacks.push(af)
		})
	}

	var fullRefresh = this.doRefresh({}, true, e);
	if(fullRefresh) afterCallbacks.push(fullRefresh)	

	return function(){
		for(var i=0;i<afterCallbacks.length;++i){
			afterCallbacks[i]()
		}
	}
}