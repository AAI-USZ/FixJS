function(changed, previous, callback) {
            if (changed.d > changed.c) {
                callback('c must be bigger than d!');
            } else {
                callback(null);
            }
        }