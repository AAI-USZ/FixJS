function(val) {
                    if (typeof val === "number") {
                        while (val >= 1.0) val -= 1.0;
                        while (val <  0.0) val += 1.0;
                        this._.phase = val;
                        this._.x = 1024 * this._.phase;
                    }
                }