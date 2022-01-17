function(value) {
                    if (typeof value === "object" && value instanceof Array) {
                        this._.args = value;
                    }
                }