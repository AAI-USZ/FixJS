function(err) {
        if(err) {
            psm.log.error(err, 'Failed to check world links.');
            if(cb) cb(err);
            return;
        }

        psm.log.silly('Moving worlds to RAM');
        self.files.worldsToRam(function(err) {
            if(err) {
                psm.log.error(err, 'Failed to move worlds to RAM disk.');
                if(cb) cb(err);
                return;
            }

            psm.log.silly('Starting server');
            self.proc.start(function(err, proc) {
                if(err) {
                    psm.log.error(err, 'Unable to start minecraft process.');
                    if(cb) cb(err);
                    return;
                }

                psm.log.silly('Done.');
                if(cb) cb();
            });
        });
    }