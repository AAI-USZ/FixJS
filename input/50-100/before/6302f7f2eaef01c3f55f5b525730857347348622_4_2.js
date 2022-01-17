function (keys) {
        var key;

        // Check for set(String,String)
        if (typeof keys === 'string') {
            console.log('remove(String): ', keys);
            delete this._storage[keys];
        } else if (Helper.isArray(keys)) {
            console.log('remove(Array): ', keys);
            for (key in keys) {
                if (keys.hasOwnProperty(key)) {
                    delete this._storage[keys[key]];
                }
            }
        }
    }