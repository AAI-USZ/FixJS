function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.depth = value;
                        _.lfo.mul = _.depth * _.offset;
                    }
                }