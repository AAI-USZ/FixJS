function(value) {
                    if (typeof value === "number") {
                        this._.saved = new Float32Array(value);
                        this._.numOfSamples = value;
                    }
                }