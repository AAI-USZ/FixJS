function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.ratio = val;
                        set_params.call(this, _.ratio, _.attack, _.release);
                    }
                }