function(o) {
    var self = this;
    events.EventEmitter.call(self);

    self._serverId = o.sid; //process.argv[2];
    self._socketFile = o.sf; //process.argv[3];
    self._managerPort = o.mp; //process.argv[4];
    self._managerToken = o.tk; //process.argv[5];

    psm.log.silly('Instantiating OutputParser');
    self.outputs = new OutputParser({
        logger: psm.log
    });

    self.outputs.on('error', function() {
        //hmmm...
    });

    psm.log.silly('Getting settings for this worker');
    self._getSettings(function(err, sets) {
        if(err) {
            psm.log.error(err, 'Unable to get settings');
            self._notifyError(err, function() {
                process.exit(1);
            });
            return;
        }

        self.server = sets;

        psm.log.silly('Instantiating FileManager');
        self.files = new FileManager({
            logger: psm.log,
            worker: self,
            backup: sets.backups,
            paths: sets.paths,
            worlds: sets.worlds,
            ramWorlds: sets.ramWorlds
        });

        psm.log.silly('Instantiating ProcManager');
        self.proc = new ProcManager({
            logger: psm.log,
            outputParser: self.outputs,
            startup: sets.startup,
            paths: sets.paths
        });

        psm.log.silly('Starting enode server');
        self._startServer(function(err) {
            if(err) {
                psm.log.error(err, 'Unable to start enode server');
                self._notifyError(err, function() {
                    process.exit(1);
                });
                return;
            }

            psm.log.silly('Notifying manager of ready state');
            self._notifyReady();
        });
    });

    process.on('exit', function() {
        try {
            fs.unlinkSync(self._socketFile);
        } catch(e) {
            psm.log.error(e, 'Unable to remove socket file');
        }
    });
}