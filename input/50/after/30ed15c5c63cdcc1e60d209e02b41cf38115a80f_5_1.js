function(err, stderr, stdout) {
            if (err) {
                cfg.remove_platform(target);
                throw 'An error occured during creation of ' + target + ' sub-project. ' + err;
            } else if (callback) callback();
        }