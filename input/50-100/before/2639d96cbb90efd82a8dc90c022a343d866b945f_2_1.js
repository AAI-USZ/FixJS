function() {
        // add this key/buffer to the store
        if ( !store[self.namespace()] ) {
            store[self.namespace()] = {};
        }

        // store it
        store[self.namespace()][key] = buffer;

        console.log('+++ STORE +++');
        console.log(store);
        console.log('--- STORE ---');

        // memory operation always succeeds
        callback(null);
    }