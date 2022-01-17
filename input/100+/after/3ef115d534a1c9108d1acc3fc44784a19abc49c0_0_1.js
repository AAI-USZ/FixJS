function(event_handler) {
        if(!this.thoonk.subscriptions.hasOwnProperty(this.sub)) {
            this.thoonk.once('subscribed.' + this._build_event(this.subscribables[this.subscribables.length - 1]), function() {
                this.emit('subscribe_ready');
                if(this.callback) { 
                    process.nextTick(this.callback);
                }
            }.bind(this));
            this.thoonk.subscriptions[this.sub] = this.subscribables;
            for(var subscribable in this.subscribables) {
                if(!this.thoonk.lredis.subscription_set['sub ' + this._build_event(this.subscribables[subscribable])]) {
                    this.thoonk.lredis.subscribe(this._build_event(this.subscribables[subscribable]));
                }
            }
        } else {
            this.emit('subscribe_ready');
                if(this.callback) { 
                    process.nextTick(this.callback);
                }
        }
        if(!this.subinitted) {
            for(var subscribable in this.subscribables) {
                if(typeof event_handler != "undefined") {
                    this.thoonk.on(this._build_event(this.subscribables[subscribable]), event_handler);
                }
                this.thoonk.on(this._build_event(this.subscribables[subscribable]), this.handle_event.bind(this));
            }
            this.subinitted = true;
        }
    }