function (cb) {
            console.log('each');
            var key;

            // Verify that the callback is function
            if (typeof  cb !== 'function') {
                throw 'Missing required callback function.';
            }

            for (key in this._storage) {
                cb(key, this._storage[key]);
            }
        }