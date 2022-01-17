function() {
    EventEmitter.call(this);
    this.io = null;
    this.socket = null;
	this.country = 'US';
    this.pass = 'tryo';
    this.current_track = {};
    this.current_track_start_time = 0;
    this.current_track_timer = 0;
    this.timeoutId = null;
    return this;
}