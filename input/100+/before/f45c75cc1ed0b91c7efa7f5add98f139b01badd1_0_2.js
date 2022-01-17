function (sql, block, cb) {
            var oi = this.outputIdentifier.bind(this);
            return this.execute(sql, hitch(this, function (rows, fields) {
                var cols = [];
                if (rows && rows.length) {
                    cols = this.__columns = Object.keys(rows[0]);
                    //the pg driver does auto type coercion
                    cols = cols.map(function (c) {
                        return [oi(c), function (o) {
                            return o;
                        }, c];
                    }, this);
                }

                var ret = new comb.Promise();
                if (block) {
                    return this.__processRows(rows, cols, block)
                } else {
                    ret.callback();
                }
                return ret;
            }));
        }