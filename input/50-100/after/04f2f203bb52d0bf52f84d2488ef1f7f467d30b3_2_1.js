function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        val = val|0;
                        if (val < 0) val = _.value.length + val;
                        if (0 <= val && val < _.value.length) {
                            _.index = val;
                            changeTheValue.call(this, val);
                        }
                    }
                }