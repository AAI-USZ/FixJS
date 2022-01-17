function(cb) {
    var self = this,
    status = {
        running: self.proc.running,
        players: self.outputs.players,
	properties: self.files.properties,
        mcversion: self.outputs.mcversion,
	cbversion: self.outputs.cbversion
    };

    cb(null, status);
}