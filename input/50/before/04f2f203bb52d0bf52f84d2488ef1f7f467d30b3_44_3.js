function(value) {
                    if (typeof value === "number") {
                        if (0 <= value && value <= this._.duration) {
                            this._.phase = (value / 1000) * this._.samplerate;
                        }
                    }
                }