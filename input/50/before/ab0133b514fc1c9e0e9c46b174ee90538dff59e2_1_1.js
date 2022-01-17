function() {
    EventEmitter.call(this);
    this.io = null;
    this.socket = null;
	this.country = 'US';
    this.pass = 'tryo';
    return this;
}