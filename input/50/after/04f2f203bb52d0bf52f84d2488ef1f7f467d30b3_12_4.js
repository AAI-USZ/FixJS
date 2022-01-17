function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.release = val;
                        set_params.call(this, _.ratio, _.attack, _.release);
                    }
                }