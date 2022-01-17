function (state, callback, args) {
        var subChain;

        if (arguments.length === 3) {
            // single call
            return this.position.call(callback, args, state).end();
        } else {
            // multiple calls
            subChain = this.position;
            subChain._readyState = state;

            return subChain;
        }
    }