function () {
            var args = arguments;
            if (this.__opts.returning) {
                return this._super(arguments);
            } else {
                var ret = new comb.Promise();
                this.primaryKey(this.__opts.from).then(function (res) {
                    var pks = res.map(function (r) {
                        return r.name
                    });
                    var ds = this.returning.apply(this, pks);
                    var dsPromise = ds.insert.apply(ds, args), l = res.length;
                    if (l) {
                        dsPromise.then(function (insertRes) {
                            if (l === 1) {
                                ret.callback(insertRes.map(function (i) {
                                    return i[pks[0]];
                                }).pop());
                            } else {
                                ret.callback(insertRes.pop());
                            }

                        }, ret);
                    } else {
                        dsPromise.then(ret);
                    }
                }.bind(this), ret);
                return ret;
            }
        }