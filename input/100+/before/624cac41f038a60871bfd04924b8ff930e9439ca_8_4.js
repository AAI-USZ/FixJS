function(key,val) {
                        if (opts.hasOwnProperty(key) && opts[key] === true) {
                            delete opts[key];
                            delete options[key];
                        }
                    }