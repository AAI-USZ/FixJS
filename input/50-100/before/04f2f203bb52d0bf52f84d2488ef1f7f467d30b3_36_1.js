function(value) {
                    var _ = this._;
                    if (typeof value === "number" && value > 0) {
                        _.recTime = value;
                        _.buffer = new Float32Array((timbre.samplerate * _.recTime / 1000)|0);
                    }
                }