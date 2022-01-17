function(){
		this.load_prompt();
		this.load_hooks();
		this.emit('loaded');
		if(!process.env.DEBUG) common.logger.off();
	}