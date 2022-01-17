function() {
    EventEmitter.call(this);
    this.io = null;
    this.socket = null;
	this.country = 'US';
    this.pass = 'tryo';
    this.current_track = {};
    return this;
}