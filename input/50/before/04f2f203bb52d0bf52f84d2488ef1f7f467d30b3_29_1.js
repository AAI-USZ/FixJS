function(value) {
                    if (typeof value === "number") {
                        this._.value = value;
                        changeTheValue.call(this);
                    }
                }