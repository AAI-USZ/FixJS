function(){
	this.poller = setTimeout((function(){ this.check() }).bind(this), this.options.poll);
}