function(options){

	var self = this;
	this.timeout = options.timeout || 5 * 1000; // 5 seconds

	this.target_host = options.host || 'www.google.com';
	this.target_port = options.port || 80;

	this.done = function(status, err){
		if (err) logger.error(err);
		this.emit(status, err);
		this.removeAllListeners();
		this.socket.destroy();
	};

	this.establish = function(){

		var socket = this.socket = new net.Socket();
		socket.setTimeout(this.timeout);

		socket.connect(parseInt(this.target_port), this.target_host);

		socket.once('connect', function(){
			self.done('connect');
		});

		socket.once('timeout', function(e){
			self.done('error', new Error("Connection timeout."));
		});

		// listen for any errors
		socket.once('error', function(e){
			self.done('error', e);
		})

	};

}