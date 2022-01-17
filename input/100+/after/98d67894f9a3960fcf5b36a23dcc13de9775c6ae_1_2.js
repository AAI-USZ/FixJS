function(cmd, args, pipe, callback){
	var specialCmd = {CONNECT: 0, RESTORE:0};
	if(this.state == 1 || cmd in specialCmd){

		var tmp = {
			'cmd': cmd,
			'chl': this.chl
		}

		if(args) tmp.params = args;
		if(pipe) tmp.params.pipe = typeof pipe == 'string' ? pipe : pipe.pubid;
		if(this.session.id) tmp.sessid = this.session.id;

		this.log('<<<< ', cmd.toUpperCase() , " >>>> ", tmp);
		
		if(typeof callback != "function")	callback = function(){};
		
		var data = [];
		try { 
			data = JSON.stringify([tmp]);
		}catch(e){
			this.log(e);
			this.log(data);
		}
		
		this.transport.send(data, callback);
		if(!(cmd in specialCmd)){
			clearTimeout(this.poller);
			this.poll();
		}
		this.chl++;
		this.session.saveChl();
	} else {
		this.on('ready', this.sendCmd.bind(this, cmd, args));
	}
	
	return this;
}