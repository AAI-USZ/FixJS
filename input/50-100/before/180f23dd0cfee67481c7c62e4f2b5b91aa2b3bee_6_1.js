function(cb) {
    var self = this,
    status = {
        running: self.proc.running,
        players: self.outputs.players,
        version: self.outputs.version
    };

    cb(null, status);
}