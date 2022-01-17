function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.thres  = value;
                        _.thres2 = value * value;
                    }
                }