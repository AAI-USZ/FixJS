function(changed, previous, events, callback) {
            if (changed.a < previous.a) {
                callback('a must be bigger than a before!');
            } else {
                callback(null);
            }
        }