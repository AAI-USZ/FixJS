function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.time = value;
                        set_params.call(this, _.time, this._.fb, _.wet);
                    }
                }