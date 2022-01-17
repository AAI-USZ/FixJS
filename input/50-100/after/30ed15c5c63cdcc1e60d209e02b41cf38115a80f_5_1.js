function(err, stderr, stdout) {
                    if (err) {
                        cfg.remove_platform(target);
                        throw 'An error occured during git-clone of ' + repos[target] + '. ' + err;
                    }
                    create(target, output, cfg, callback);
                }