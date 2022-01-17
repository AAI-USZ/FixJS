function(value) {
                var _ = this._;
                if (typeof value === "number") {
                    if (0 <= value && value <= _.duration) {
                        _.phase = ((value / 1000) * timbre.samplerate)|0;
                    }
                }
            }