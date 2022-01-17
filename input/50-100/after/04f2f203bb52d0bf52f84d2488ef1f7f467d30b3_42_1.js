function(val) {
                    var synth, _ = this._;
                    if (typeof val === "string") {
                        if (val !== _.version) {
                            if ((synth = AwesomeTimbre.Versions[val]) !== undefined) {
                                _.version = val;
                                if (_.synth && _.synth.destroy) {
                                    _.synth.destroy(this);
                                }
                                _.synth = synth(this);
                            }
                        }
                    }
                }