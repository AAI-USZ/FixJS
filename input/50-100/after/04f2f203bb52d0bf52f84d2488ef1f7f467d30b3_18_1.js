function(val) {
                    var f;
                    if (typeof val === "string") {
                        if ((f = Filter.Types[val]) !== undefined) {
                            this._.type = val;
                            this._.set_params = f.set_params;
                        }
                    }
                }