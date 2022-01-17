function(val) {
                    var _ = this._;
                    if (typeof val === "number") {
                        _.interval = val;
                        _.interval_samples = (timbre.samplerate * (val / 1000))|0;
                        if (_.interval_samples < _.buffer.length) {
                            _.interval_samples = _.buffer.length;
                            _.interval = _.buffer.length * timbre.samplerate / 1000;
                        }
                    }
                }