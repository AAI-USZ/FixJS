function(value) {
                    var f;
                    if (typeof value === "string") {
                        if ((f = Filter.Types[value]) !== undefined) {
                            this._.type = value;
                            this._.set_params = f.set_params;
                        }
                    }
                }