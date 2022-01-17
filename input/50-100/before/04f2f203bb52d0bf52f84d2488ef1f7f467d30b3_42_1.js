function(value) {
                    var synth, _ = this._;
                    if (typeof value === "string") {
                        if (value !== _.version) {
                            if ((synth = AwesomeTimbre.Versions[value]) !== undefined) {
                                _.version = value;
                                if (_.synth && _.synth.destroy) {
                                    _.synth.destroy(this);
                                }
                                _.synth = synth(this);
                            }
                        }
                    }
                }