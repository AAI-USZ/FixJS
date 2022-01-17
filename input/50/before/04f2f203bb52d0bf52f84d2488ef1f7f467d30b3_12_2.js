function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.ratio = value;
                        set_params.call(this, _.ratio, _.attack, _.release);
                    }
                }