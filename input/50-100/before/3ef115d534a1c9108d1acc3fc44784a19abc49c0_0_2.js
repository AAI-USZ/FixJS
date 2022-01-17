function(callback) {
        this.subscription = new Subscription(this, this.name, this.handle_event.bind(this));
        this.subscription.once("subscribe_ready", function() {
            this.emit("subscribe_ready");
            if(callback) {
                callback(false, this.subscription);
            }
        }.bind(this));
    }