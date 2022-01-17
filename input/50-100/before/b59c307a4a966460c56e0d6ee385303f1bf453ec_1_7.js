function (cb) {
            if (cb) {
                if (this.__fired && this.__errors.length) {
                    cb.call(this, this.__errors);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        }