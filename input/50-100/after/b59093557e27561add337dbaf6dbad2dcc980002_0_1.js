function(callback, node) {
        /*
        *
        * Validates the value of the input and grabs the appropriate
        * success and error callbacks.
        *
        */
        callback = callback.result ? callback.success : callback.error;

        /*
        * Throw error if callback is not a function and Gravy was unable to
        * find callback
        */
        if ( !_.isFunction(callback) && !(callback = this[callback]))
            throw new Error("[Gravy] Unable to find callback: " + callback);

        /*
        *
        * Invokes the callback and passes along the input node.
        *
        */
        return callback.apply(this, [node]);
    }