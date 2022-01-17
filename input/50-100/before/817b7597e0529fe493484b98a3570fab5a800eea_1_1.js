function (event, $args) {
            var events = this.__events[event],
                params,
                x,
                length;

            if (events) {
                params = toArray(arguments);
                params.shift();
                length = events.length;

                for (x = 0; x < length; x += 1) {
                    try {
                        // TODO: optimize args.length = 1 and 2 with .call
                        events[x].fn.apply(events[x].context || this, params);
                    } finally {
                        continue;
                    }
                }
            }

            return this;
        }