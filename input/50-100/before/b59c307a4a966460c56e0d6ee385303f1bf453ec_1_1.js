function (cb) {
            if (cb) {
                if (this.__fired && this.__results) {
                    cb.apply(this, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        }