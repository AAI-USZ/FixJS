function(cb) {
    var self = this;

    cb = cb || arguments[1];

    psm.log.debug('Restarting server ' + self._serverId);
    psm.log.silly('Stopping server process');
    self.proc.stop(function(err) {
        if(err) {
            psm.log.error(err, 'Failed to stop minecraft process.');
            if(cb) cb(err);
            return;
        }

        psm.log.silly('Done.');
        psm.log.silly('Moving world files to disk');
        self.proc.start(function(err, proc) {
            if(err) {
                psm.log.error(err, 'Failed to start minecraft process.');
                if(cb) cb(err);
                return;
            }

            if(cb) cb();
        });
    });
}