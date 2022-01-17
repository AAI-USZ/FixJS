function(topic) {

        if (!this.topics[topic]) {
            throw "No such topic " + topic + ". Could not trigger.";
        }

        var args = Array.prototype.slice.call(arguments, 1);
        var subscribers = this.topics[topic];
        var len = subscribers ? subscribers.length : 0;

        while (len--) {
            var subscriber = subscribers[len];
            subscriber.func.apply(subscriber.context, args);
        }
    }