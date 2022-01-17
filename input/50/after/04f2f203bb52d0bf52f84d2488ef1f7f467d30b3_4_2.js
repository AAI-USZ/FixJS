function(val) {
                    if (typeof val === "number") {
                        this._.mul = val;
                        changeTheValue.call(this);
                    }
                }