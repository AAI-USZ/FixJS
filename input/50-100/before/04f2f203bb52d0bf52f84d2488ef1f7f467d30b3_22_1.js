function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        _.status = 0;
                        _.start  = _.value;
                        _.stop   = value;
                        _.samples = (timbre.samplerate * (_.delay / 1000))|0;
                        _.x0 = 0; _.dx = 0;
                    }
                }