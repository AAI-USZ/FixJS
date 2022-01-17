function emit(event, args) {
        //var args = Array.prototype.slice.call(arguments);
        //var event = args.shift();
        var callbacks = events[event] || false;
        if(callbacks === false) {
            return self;
        }
        for(var i in callbacks) {
            if(callbacks.hasOwnProperty(i)) {
                callbacks[i](args);
            }
        }
        return self;
    }