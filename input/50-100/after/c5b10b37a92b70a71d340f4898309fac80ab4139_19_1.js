function on(eventName, cb){
	if(arguments.length === 1){
		cb = eventName
		eventName = ''
	}
	_.assertString(eventName)
	_.assertFunction(cb)
	
	if(this.onListeners === undefined) this.onListeners = {}
	if(this.onListeners[eventName] === undefined) this.onListeners[eventName] = []
	this.onListeners[eventName].push(cb)
}