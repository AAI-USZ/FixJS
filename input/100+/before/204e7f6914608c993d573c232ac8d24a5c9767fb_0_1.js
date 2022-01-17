function(val) {
                    if (typeof val === "string") {
                        this._.mml = val;
                        compile.call(this, val);
                    }
                }