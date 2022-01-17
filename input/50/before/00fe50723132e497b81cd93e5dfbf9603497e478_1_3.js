function(channel){
	if(channel in this.channels){
		return this.channels[channel];
	}
	
	return false;
}