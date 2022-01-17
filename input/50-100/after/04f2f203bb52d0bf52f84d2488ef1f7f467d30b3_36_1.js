function(val) {
                    var _ = this._;
                    if (typeof val === "number" && val > 0) {
                        _.recTime = val;
                        _.buffer = new Float32Array((timbre.samplerate * _.recTime / 1000)|0);
                    }
                }