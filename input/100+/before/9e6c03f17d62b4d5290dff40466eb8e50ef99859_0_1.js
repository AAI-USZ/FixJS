function (event, fn) {
            var index = this.__getListenerIndex(event, fn);

            if (index !== -1) {
                this.__events[event].splice(index, 1);
                if (!this.__events[event].length) {
                    delete this.__events[event];
                }
            }

            return this;
        }