function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.fb = val;
                        set_params.call(this, _.time, _.fb, _.wet);
                    }
                }