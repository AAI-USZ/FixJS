function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.rate = val;
                        _.lfo.freq.value = val;
                    }
                }