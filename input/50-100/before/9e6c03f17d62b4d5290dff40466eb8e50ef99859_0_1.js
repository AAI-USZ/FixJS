function ($event) {
            if ($event) {
                delete this.__events[$event];
            } else {
                this.__events = {};
            }

            return this;
        }