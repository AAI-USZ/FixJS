function(dt, callback) {
    var command = ['-a', 'hw:0,0', dt.file];
    var child = spawn('mpg321', command);
    var self = this;
    
    this.child = child;
    this.volume = (dt.volume ? '80' : dt.volume);
    
    this.passed = 0;

    child.stderr.on('data', function() {
	if (self.passed == 0) {
	    self.setVolume((dt.volume ? '80' : dt.volume));
	    callback(null);
	}
	self.passed++;
    });

    child.on('exit', function(code) {
	console.log('end');
    });    

    //
    // Kick process if brutally exited
    //
    process.on('exit', function () {
	self.stop();
    });
}