function(val) {
                    if (typeof val === "number") {
                        this._.saved = new Float32Array(val);
                        this._.numOfSamples = val;
                    }
                }