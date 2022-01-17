function(fn, server, data, cb) {
    var self = this;

    if(typeof(data) == 'function') {
	cb = data;
	data = null;
    }
    
    if(!self._workers[server]) {
        if(cb) cb(new Error('No worker process started for server "' + server + '"'));
    } else {
	data = (data ? JSON.stringify(data) : data);

	self.emit('action::' + server + '::' + fn, data, cb);
    }
}