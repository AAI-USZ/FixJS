function(callback, node) {
        /*
        *
        * Validates the value of the input and grabs the appropriate
        * success and error callbacks.
        *
        */
        callback = callback.result ? callback.success : callback.error;
        if (!_.isFunction(callback)) callback = this[callback];

        /*
        *
        * Invokes the callback and passes along the input node.
        *
        */
        return callback.apply(this, [node]);
    }