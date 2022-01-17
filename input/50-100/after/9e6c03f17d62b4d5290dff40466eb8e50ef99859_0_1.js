function ($event) {
            if ($event) {
                this.__events[$event] = [];
                delete this.__eventsIndex[$event];
                delete this.__events[$event];
            } else {
                this.__events = {};
                this.__eventsIndex = {};
            }

            return this;
        }