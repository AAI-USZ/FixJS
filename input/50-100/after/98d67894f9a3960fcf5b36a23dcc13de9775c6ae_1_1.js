function(channel, data, callback){
	var pipe = this.getChannel(channel);
	if(!pipe && channel.length == 32) pipe = this.getPipe(channel);
	
	if(pipe){
		var $event = typeof data == "string" ? "message" : "data";
		var args = {data: data};
		pipe.send($event, data, callback);
		//pipe.trigger("pub",args);
	}else{
		this.log("NO Channel " + channel);
	}
}