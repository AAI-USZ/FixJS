function (cb) {
            if (cb) {
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
        }