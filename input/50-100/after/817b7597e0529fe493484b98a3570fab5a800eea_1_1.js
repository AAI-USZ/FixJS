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
                    events[x].fn.apply(events[x].context || this, params);
                }
            }

            return this;
        }