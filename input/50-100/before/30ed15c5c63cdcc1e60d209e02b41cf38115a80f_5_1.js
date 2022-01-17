function(err, stderr, stdout) {
                    if (err) {
                        console.error('An error occured during git-clone of ' + repos[target] + ', ', err);
                        cfg.remove_platform(target);
                        return;
                    }
                    create(target, output, cfg);
                }