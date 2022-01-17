function (name) {
                var mod = require(resolve.sync(name, { basedir: process.cwd() }));
                Object.keys(mod).forEach(function (k) {
                    definitions[k] = mod[k];
                });
            }