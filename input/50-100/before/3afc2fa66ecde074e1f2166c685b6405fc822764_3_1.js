function(topic, args) {

        if (!this.topics[topic]) {
            throw "No such topic " + topic + ". Could not trigger.";
        }

        var subscribers = this.topics[topic];
        var len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }
    }