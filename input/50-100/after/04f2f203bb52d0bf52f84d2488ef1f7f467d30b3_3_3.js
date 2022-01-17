function(val) {
                var _ = this._;
                if (typeof val === "number") {
                    if (0 <= val && val <= _.duration) {
                        _.phase = ((val / 1000) * timbre.samplerate)|0;
                    }
                }
            }