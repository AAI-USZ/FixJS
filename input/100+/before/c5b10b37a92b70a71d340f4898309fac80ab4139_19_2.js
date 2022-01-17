function off(eventName, cb){
	if(arguments.length === 0){
		this.onListeners = undefined
	}else if(arguments.length === 1){
		this.onListeners[eventName] = undefined
	}else{
		if(this.onListeners === undefined){
			console.log('WARNING: off called for eventName: ' + eventName + ', but no listeners have ever been added.')
			return
		}
		var listeners = this.onListeners[eventName]
		var ii = listeners.indexOf(cb)
		if(ii !== -1){
			listeners.splice(cb, 1)
		}else{
			console.log('WARNING: off called for eventName: ' + eventName + ', but listener function not found.')
		}
	}
}