function(evt) {
            // to observing commands
            var pending = this.getPendingCommand(evt);
            if (pending) {
                pending.callback(evt);
                this.removePendingCommand(pending);
            }

            // to denormalizers
            var denorm = this.getDenormalizer(evt.name);

            _(denorm).each(function(d) {
                d.handle(evt);
            });
        }