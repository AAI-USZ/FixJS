function(value) {
                    if (this._.mode === "bpm") {
                        if (typeof value === "number" && value > 0) {
                            changeBPM.call(this, value);
                        }
                    }
                }