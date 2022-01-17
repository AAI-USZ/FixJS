function (Class, toArray) {

    'use strict';

    return new Class({
        $name: 'MixableEventsEmitter',

        __events: {},
        __eventsIndex: {},

        // public methods

        /**
         * Adds a new event listener.
         * If the listener is already attached, it won't get duplicated.
         *
         * @param {String}   event      The event name
         * @param {Function} fn         The listener
         * @param {Object}   [context]  The context in which the function will be executed
         *
         * @return {MixableEventsEmitter} The instance itself to allow chaining
         */
        addListener: function (event, fn, $context) {
            var events = this.__events[event] = this.__events[event] || [];

            if (this.__getListenerIndex(event, fn) === -1) {
                events.push({ fn: fn, context: $context });
            }

            return this;
        },

        /**
         * Removes an existent event listener.
         *
         * @param {String}   event The event name
         * @param {Function} fn    The listener
         *
         * @return {MixableEventsEmitter} The instance itself to allow chaining
         */
        removeListener: function (event, fn) {
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
        },

        /**
         * Removes all listeners of the given name.
         * If no type is specified, removes all events of all names.
         *
         * @param {String} [$event] The event name
         *
         * @return {MixableEventsEmitter} The instance itself to allow chaining
         */
        removeListeners: function ($event) {
            if ($event) {
                this.__events[$event] = [];
                delete this.__eventsIndex[$event];
                delete this.__events[$event];
            } else {
                this.__events = {};
                this.__eventsIndex = {};
            }

            return this;
        },

        // protected methods

        /**
         * Fires an event.
         *
         * @param {String}   event   The event name
         * @param {...mixed} [$args] The arguments to pass to each listener
         *
         * @return {MixableEventsEmitter} The instance itself to allow chaining
         */
        _fireEvent: function (event, $args) {
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
        },

        // private methods

        /**
         * Gets a listener index.
         *
         * @param {String}   name The event name
         * @param {Function} fn   The function
         *
         * @return {Number} The index of the listener if found or -1 if not found
         */
        __getListenerIndex: function (event, fn) {
            var events = this.__events[event],
                x;

            if (events) {
                for (x = events.length - 1; x >= 0; x -= 1) {
                    if (events[x].fn === fn) {
                        return x;
                    }
                }
            }

            return -1;
        }
    });
}