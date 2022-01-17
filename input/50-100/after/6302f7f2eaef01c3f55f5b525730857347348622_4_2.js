function () {
            console.log('getKeys');
            var key, keys = [];
            for (key in this._storage) {
                keys.push(key);
            }

            return keys;
        }