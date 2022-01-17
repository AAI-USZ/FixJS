function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.depth = val;
                        _.lfo.mul = _.depth * _.offset;
                    }
                }