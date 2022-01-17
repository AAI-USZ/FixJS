function(value) {
                    if (typeof value === "number") {
                        if (1 <= value && value <= 511) {
                            this._.bpm = value;
                        }
                    }
                }