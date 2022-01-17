function(value) {
                    if (typeof value === "string") {
                        this._.mml = value;
                        compile.call(this, value);
                    }
                }