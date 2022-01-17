function() {
        // add this key/buffer to the store
        if ( !store[self.namespace()] ) {
            store[self.namespace()] = {};
        }

        // store it
        store[self.namespace()][key] = buffer;

        // console.log('+++ _store +++');
        // console.log(store);
        // console.log('--- _store ---');

        // memory operation always succeeds
        callback(null);
    }