function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.thres  = val;
                        _.thres2 = val * val;
                    }
                }