function(cb) {
    var self = this;

    if (self.volume != 65)
	self.volume = 66;


    this.increaser = setInterval(function() {	
	self.setVolume(self.volume);
	
	self.volume += 1;
	if (self.volume >= 100) {
	    clearInterval(self.increaser);
	    cb(null);
	}
    }, 1500);

}