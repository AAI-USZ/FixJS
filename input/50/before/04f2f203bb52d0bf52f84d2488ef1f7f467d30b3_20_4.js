function(value) {
                    if (typeof value === "number") {
                        while (value >= 1.0) value -= 1.0;
                        while (value <  0.0) value += 1.0;
                        this._.phase = this._.x = value;
                    }
                }