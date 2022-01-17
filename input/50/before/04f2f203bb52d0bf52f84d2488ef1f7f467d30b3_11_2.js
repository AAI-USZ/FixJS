function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.rate = value;
                        _.lfo.freq.value = value;
                    }
                }