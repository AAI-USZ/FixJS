function(value) {
                    if (typeof value === "number") {
                        this._.add = value;
                        changeTheValue.call(this);
                    }
                }