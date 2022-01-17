function(val) {
                    var mode;
                    if (typeof val === "string") {
                        if ((mode = ResonantFilter.Types[val]) !== undefined) {
                            this._.type = val;
                            this._.mode = mode;
                        }
                    }
                }