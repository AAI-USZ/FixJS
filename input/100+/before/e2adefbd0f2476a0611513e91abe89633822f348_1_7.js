function(server, cb) {
    var self = this;

    self.server = server = JSON.parse(server);

    psm.init(function() {
	psm.log.silly('Instantiating OutputParser');
	self.outputs = new OutputParser({
            logger: psm.log
	});
	self._setupOutputListeners();
	
	
	psm.log.silly('Instantiating FileManager');
	self.files = new FileManager({
            logger: psm.log,
            worker: self,
            backup: server.backups,
            paths: server.paths,
            worlds: server.worlds,
            ramWorlds: server.ramWorlds
	});
	
	psm.log.silly('Instantiating ProcManager');
	self.proc = new ProcManager({
            logger: psm.log,
            outputParser: self.outputs,
            startup: server.startup,
            paths: server.paths
	});

	if(cb) cb();
    });
}