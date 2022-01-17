function(val) {
                    if (typeof val === "number") {
                        this._.value = val;
                        changeTheValue.call(this);
                    }
                }