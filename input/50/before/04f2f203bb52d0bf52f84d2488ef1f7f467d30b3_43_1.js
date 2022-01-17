function(value) {
                    if (typeof value === "number" && value > 0) {
                        this._.timeout = value;
                        this._.timeout_samples = (timbre.samplerate * (value / 1000))|0;
                    }
                }