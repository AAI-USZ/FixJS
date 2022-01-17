function(callback) {
        if(!this.subscription) {
            this.subscription = new Subscription(this, this.name, this.handle_event.bind(this), function() {
                this.emit("subscribe_ready");
                if(callback) {
                    callback(false, this.subscription);
                }
            }.bind(this));
        } else {
            this.emit("subscribe_ready");
            if(callback) {
                callback(false, this.subscription);
            }
        }
    }