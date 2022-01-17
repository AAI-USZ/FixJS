function(value) {
                    var mode;
                    if (typeof value === "string") {
                        if ((mode = ResonantFilter.Types[value]) !== undefined) {
                            this._.type = value;
                            this._.mode = mode;
                        }
                    }
                }