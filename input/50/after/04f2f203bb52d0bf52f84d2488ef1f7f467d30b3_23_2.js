function(val) {
                    if (typeof val === "number" && val >= 0) {
                        this._.delay = val;
                        this._.delaySamples = (timbre.samplerate * (val / 1000))|0;
                    }
                }