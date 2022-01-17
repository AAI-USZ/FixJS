function PromisedHandler () {
        this.getSuggestions = function (entry, callback) {
            this.pendingSuggestion = {
                entry : entry,
                callback : callback
            };
        };
    }