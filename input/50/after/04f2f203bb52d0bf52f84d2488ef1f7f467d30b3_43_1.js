function(val) {
                    if (typeof val === "number" && val > 0) {
                        this._.timeout = val;
                        this._.timeout_samples = (timbre.samplerate * (val / 1000))|0;
                    }
                }