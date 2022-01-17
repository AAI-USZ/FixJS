function()
    {
        var _delegates = [];
        /**
         * Registers an event handler
         * @param  callable delegate Event handler to register
         */
        this.register = function(delegate)
        {
            _delegates.push(delegate);
        }

        /**
         * Removes an event handler
         * @param  callable delegate Event handler to remove
         */
        this.deregister = function(delegate)
        {
            for (var i in _delegates) {
                if (_delegates[i] == delegate) {
                    _delegates.splice(i, 1);
                }
            }
        }

        /**
         * Executes all the registered event handlers
         * @params          Paramaters to pass to the event handlers
         */
        this.apply = function()
        {
            for (var i in _delegates) {
                Util.callUserFuncArray(_delegates[i], arguments);
            }
        }
    }