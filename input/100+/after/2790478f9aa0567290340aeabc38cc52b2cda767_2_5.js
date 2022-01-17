function (out) {
                tok.out = out;
                $this.emit('macroEnd', {
                    name: tok.name, args: tok.args,
                    duration: new Date() - ts
                });
                q_next();
            }