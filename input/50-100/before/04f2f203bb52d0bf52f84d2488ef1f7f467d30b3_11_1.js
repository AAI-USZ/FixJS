function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        if (0 <= value && value <= 1.0) {
                            _.wet = value;
                            _.wet0 = Math.sin(0.25 * Math.PI * value);
                            _.dry0 = Math.cos(0.25 * Math.PI * value);
                        }
                    }
                }