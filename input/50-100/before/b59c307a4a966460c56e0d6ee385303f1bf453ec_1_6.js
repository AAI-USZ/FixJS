function (cb) {
            if (cb) {
                if (this.__fired && !this.__errors.length) {
                    cb.call(this, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        }