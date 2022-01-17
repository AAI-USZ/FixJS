function(err, stderr, stdout) {
            if (err) {
                cfg.remove_platform(target);
                console.error('An error occured during creation of ' + target + ' sub-project, ', err);
            }
        }