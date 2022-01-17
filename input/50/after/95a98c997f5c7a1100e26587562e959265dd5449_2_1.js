function Topic (listeners) {
        // Using discriptor to prevent non-subTopic properties from being enumerable
        Object.defineProperties(this, {
            _listeners : {
                value : listeners && Object.prototype.toString.call(listeners) === '[object Array]' ? listeners : [],
                writable : true
            }
        })
    }