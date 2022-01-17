function(){
	if(this.transport.id == 0)
		this.poller = setTimeout((function(){ this.check() }).bind(this), this.options.poll);
}