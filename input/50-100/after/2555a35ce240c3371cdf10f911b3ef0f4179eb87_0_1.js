function(evt) {
            // to denormalizers
            var denorm = this.getDenormalizer(evt.name);

            _(denorm).each(function(d) {
                d.handle(evt);
            });
            
            // to observing commands
            var pending = this.getPendingCommand(evt);
            if (pending) {
                pending.callback(evt);
                this.removePendingCommand(pending);
            }
        }