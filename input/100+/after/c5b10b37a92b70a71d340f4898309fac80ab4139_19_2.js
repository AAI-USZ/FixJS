function emit(e, eventName){
	var afterCallbacks = []
		
	var args = Array.prototype.slice.call(arguments, 2)
	
	function callListener(listener){
		var af = listener.apply(undefined, args)
		if(af) afterCallbacks.push(af)
	}
	
	if(this.onListeners){
		if(this.onListeners[eventName]){
			this.onListeners[eventName].forEach(callListener)
		}
		if(this.onListeners['any']){
			this.onListeners['any'].forEach(callListener)
		}
	}
	if(this.onceListeners){
		if(this.onceListeners[eventName]){
			var arr = this.onceListeners[eventName]
			this.onceListeners[eventName] = undefined
			arr.forEach(callListener)
		}
		if(this.onceListeners['any']){
			var arr = this.onceListeners['any']
			this.onceListeners['any'] = undefined
			arr.forEach(callListener)
		}
	}

	return function(){
		for(var i=0;i<afterCallbacks.length;++i){
			afterCallbacks[i]()
		}
	}
}