function(val) {
                    if (this._.mode === "bpm") {
                        if (typeof val === "number" && val > 0) {
                            changeBPM.call(this, val);
                        }
                    }
                }