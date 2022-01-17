function (keys) {
        console.log('get');
        return this._storage[keys];
    }