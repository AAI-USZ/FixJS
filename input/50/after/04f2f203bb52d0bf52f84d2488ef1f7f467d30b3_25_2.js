function(val) {
                    if (typeof val === "number") {
                        if (1 <= val && val <= 511) {
                            this._.bpm = val;
                        }
                    }
                }