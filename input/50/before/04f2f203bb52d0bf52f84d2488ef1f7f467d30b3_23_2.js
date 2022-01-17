function(value) {
                    if (typeof value === "number" && value >= 0) {
                        this._.delay = value;
                        this._.delaySamples = (timbre.samplerate * (value / 1000))|0;
                    }
                }