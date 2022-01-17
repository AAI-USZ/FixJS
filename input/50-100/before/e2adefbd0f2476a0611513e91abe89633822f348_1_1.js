function(err, proc) {
                if(err) {
                    psm.log.error(err, 'Unable to start minecraft process.');
                    if(cb) cb(err);
                    return;
                }

                psm.log.silly('Done.');
                if(cb) cb(null);
            }