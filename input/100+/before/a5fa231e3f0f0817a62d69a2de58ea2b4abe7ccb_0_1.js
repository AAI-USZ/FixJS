function(subscriptions) {
        // we want to propagate the options object to all BB types
        this.options || (this.options = {});
        // normalize the input
        if (!(subscriptions || (subscriptions = this.options.subscriptions))) return;
        if (_.isFunction(subscriptions)) subscriptions = subscriptions.call(this);
        // handles for unsubscribing
        this.options.subscribed || (this.options.subscribed = []);
        // iterate the hash
        for (var key in subscriptions) {
            var method = this[subscriptions[key]];
            if (!method) throw new Error('Subscription method "' + subscriptions[key] + '" does not exist');
            method = _.bind(method, this);
            // in the form [[key,method], [...]]
            this.options.subscribed.push($.subscribe(key, method));
        }
    }