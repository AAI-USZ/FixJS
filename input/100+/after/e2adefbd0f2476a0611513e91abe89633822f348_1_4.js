function(err) {
        if(err) {
            psm.log.error(err, 'Failed to stop minecraft process.');
            if(cb) cb(err);
            return;
        }

        psm.log.silly('Moving world files to disk');
        self.files.worldsToDisk(function(err) {
            if(err) {
                psm.log.error(err, 'Failed to move world files to disk.');
                if(cb) cb(err);
                return;
            }

            psm.log.silly('Done.');
            if(cb) cb();
        });
    }