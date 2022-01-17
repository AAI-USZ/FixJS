function(value) {
                    if (typeof value === "number") {
                        this._.mul = value;
                        changeTheValue.call(this);
                    }
                }