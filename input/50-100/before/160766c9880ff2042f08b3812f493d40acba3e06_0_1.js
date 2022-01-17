function(cb) {
    var self = this;

    self.setVolume(70);

    this.increaser = setInterval(function() {	
	self.setVolume(self.volume);
	
	self.volume += 1;
	if (self.volume >= 100) {
	    clearInterval(self.increaser);
	    cb(null);
	}
    }, 1200);

}