function(evt, callback) {
        if (evt in this.callbackManager.callbacks) {
            this.addCallback(evt, callback);
        }
    }