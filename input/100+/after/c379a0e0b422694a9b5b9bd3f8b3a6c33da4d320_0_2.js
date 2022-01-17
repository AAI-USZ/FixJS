function() {
            var mod_list = [];

            _.each(fixtures, function(val, key, list) {
                var module = {};

                module.id = key;
                module.grains = val['grains.items'];
                module.functions = {};

                // Change ["cmd.run_stdout", "cmd.run_stderr"] to
                // {"cmd": ["run_stdout", "run_stderr"]}
                _.each(val["sys.list_functions"], function(el, index, func_list) {
                    var modfunc = el.split('.'),
                        mod = modfunc[0],
                        func = modfunc[1];

                    module.functions[mod] = module.functions[mod] || [];
                    module.functions[mod].push(func);
                });

                mod_list.push(module);
            });

            this.add(mod_list);
        }