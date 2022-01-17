function(channel){
	channel = channel.toLowerCase();
	if(channel in this.channels){
		return this.channels[channel];
	}
	
	return false;
}