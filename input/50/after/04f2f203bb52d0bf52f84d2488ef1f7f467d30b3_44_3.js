function(val) {
                    if (typeof val === "number") {
                        if (0 <= val && val <= this._.duration) {
                            this._.phase = (val / 1000) * this._.samplerate;
                        }
                    }
                }