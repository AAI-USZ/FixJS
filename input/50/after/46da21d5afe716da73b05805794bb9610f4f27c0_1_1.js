function() {
	this.eventhandler.loop();
	for(var i in this.objects){
		this.objects[i].tick();
	}
}