function (name) {
                var mod;
                name = name.indexOf(".") === 0 ?
                    Path.join(process.cwd(), name) :
                    name;
                mod = require(name);
                Object.keys(mod).forEach(function (k) {
                    definitions[k] = mod[k];
                });
            }