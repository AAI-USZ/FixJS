function(value) {
                    var _ = this._;
                    if (typeof value === "string" &&
                        Scale.Scales[value] !== undefined) {
                        _.scale = value;
                        _.list = Scale.Scales[value];
                    } else if (value instanceof Array) {
                        _.scale = "";
                        _.list = value;
                    }
                }