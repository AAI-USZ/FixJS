function(pipe, $event, data){
	this.sendCmd("Event", {
		event: $event,
		data: data
	}, pipe);
}