function() {
            this.id = fixtures.grains.saltdev.id;
            this.grains = fixtures.grains.saltdev;

            this.functions = [];

            // Change ["cmd.run_stdout", "cmd.run_stderr"] to
            // {"cmd": ["run_stdout", "run_stderr"]}
            _.each(fixtures.functions.saltdev, function(el, index, list) {
                var modfunc = el.split('.'),
                    mod = modfunc[0],
                    func = modfunc[1];

                this[mod] = this[mod] || [];
                this[mod].push(func);
            }, this.functions);

            return this;
        }