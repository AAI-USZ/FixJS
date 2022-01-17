function (schema) {
                    if (schema) {
                        this._setSchema(schema);
                        if (supers && supers.length) {
                            comb.when(supers.map(function (sup) {
                                return sup.sync();
                            })).then(hitch(this, function () {
                                this.synced = true;
                                supers.forEach(this.inherits, this);
                                ret.callback(this);
                            }), ret);
                        } else {
                            this.synced = true;
                            ret.callback(this);
                        }
                        this.emit("sync", this);
                    } else {
                        var error = new ModelError("Unable to find schema for " + tableName);
                        this.emit("error", error);
                        ret.errback(error);
                    }
                }