function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.interval = value;
                        _.interval_samples = (timbre.samplerate * (value / 1000))|0;
                        if (_.interval_samples < _.buffer.length) {
                            _.interval_samples = _.buffer.length;
                            _.interval = _.buffer.length * timbre.samplerate / 1000;
                        }
                    }
                }