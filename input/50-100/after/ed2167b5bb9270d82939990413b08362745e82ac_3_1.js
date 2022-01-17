function (callbackDefinition) {

        // normalise definition
        callbackDefinition = this.$normCallback(callbackDefinition);

        /**
         * Scope for callback execution
         * @type Object
         */
        this._scope = callbackDefinition.scope;

        /**
         * Function to execute
         * @type Function
         */
        this._function = callbackDefinition.fn;

        /**
         * Arguments given when creating the callback
         */
        this._args = callbackDefinition.args;
        this._resIndex = callbackDefinition.resIndex;
        this._apply = callbackDefinition.apply;

    }