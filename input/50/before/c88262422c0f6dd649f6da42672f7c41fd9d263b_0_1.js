function(){
		this.load_prompt();
		this.load_hooks();
		this.emit('loaded');
		if(!common.program.debug) common.logger.off();
	}