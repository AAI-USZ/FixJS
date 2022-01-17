function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        if (0 <= val && val <= 1.0) {
                            _.wet = val;
                            _.wet0 = Math.sin(0.25 * Math.PI * val);
                            _.dry0 = Math.cos(0.25 * Math.PI * val);
                        }
                    }
                }