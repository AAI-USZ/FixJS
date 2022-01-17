function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.time = value;
                        set_params.call(this, _.time, _.fb, _.wet);
                    }
                }