function removeListener(listenerName){

	if(this.refreshListeners === undefined || this.refreshListeners[listenerName] === undefined){
		console.log('WARNING: no refresh listener by name: ' + listenerName);
	}else{
		delete this.refreshListeners[listenerName];
	}
	
	return true;
}