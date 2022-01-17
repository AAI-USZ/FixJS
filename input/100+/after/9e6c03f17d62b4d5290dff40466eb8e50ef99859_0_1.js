function (event, fn) {
            var index = this.__getListenerIndex(event, fn);

            if (index !== -1) {
                this.__events[event].splice(index, 1);

                if (!this.__events[event].length) {
                    delete this.__eventsIndex[event];
                    delete this.__events[event];
                } else if (this.__eventsIndex[event] !== undefined && this.__eventsIndex[event] >= index) {
                    this.__eventsIndex[event] -= 1;
                }
            }

            return this;
        }