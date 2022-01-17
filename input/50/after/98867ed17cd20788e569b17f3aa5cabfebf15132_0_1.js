function(changed, previous, events, callback) {
            if (changed.a > changed.b) {
                callback('b must be bigger than a!');
            } else {
                callback(null);
            }
        }