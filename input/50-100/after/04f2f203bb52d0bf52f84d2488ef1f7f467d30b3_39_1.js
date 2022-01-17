function(val) {
                    var _ = this._;
                    if (typeof val === "string" &&
                        Scale.Scales[val] !== undefined) {
                        _.scale = val;
                        _.list = Scale.Scales[val];
                    } else if (val instanceof Array) {
                        _.scale = "";
                        _.list = val;
                    }
                }