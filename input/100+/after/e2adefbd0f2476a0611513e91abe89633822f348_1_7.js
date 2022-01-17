function() {
    var self = this;

    cb = cb || arguments[1];

    if(cb) cb(null, self.proc.running);

    return self.proc.running;
}