function (callback, key) {
                this.collection.off(key, callback, this);
                this.collection.on(key, callback, this);
            }