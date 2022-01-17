function(val) {
                    if (typeof val === "object" && val instanceof Array) {
                        this._.args = val;
                    }
                }