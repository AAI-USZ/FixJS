function(cb) {
    var self = this;

    if(cb) cb(null, self.proc.running);

    return self.proc.running;
}