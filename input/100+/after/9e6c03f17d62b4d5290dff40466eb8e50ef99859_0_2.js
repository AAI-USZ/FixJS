function (event, $args) {
            var events = this.__events[event],
                params,
                indexes,
                curr;

            if (events) {
                params = toArray(arguments);
                params.shift();

                if (this.__eventsIndex[event] !== undefined) {
                    throw new Error('Attempt to fire event "' + event + '" when it is already being fired.');
                }

                indexes = this.__eventsIndex;
                indexes[event] = 0;

                try {
                    for (indexes[event] = 0; this.__events[event] && indexes[event] < events.length; indexes[event] += 1) {
                        curr = events[indexes[event]];
                        curr.fn.apply(curr.context || this, params);
                    }
                } finally {
                    delete indexes[event];
                }
            }

            return this;
        }