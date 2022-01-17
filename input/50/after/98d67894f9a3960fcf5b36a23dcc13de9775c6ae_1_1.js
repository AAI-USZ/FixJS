function(pipe, $event, data, callback){
	this.sendCmd("Event", {
		event: $event,
		data: data
	}, pipe, callback);
}