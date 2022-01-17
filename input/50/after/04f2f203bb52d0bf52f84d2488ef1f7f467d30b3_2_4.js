function(val) {
                    if (typeof val === "number") {
                        this._.add = val;
                        changeTheValue.call(this, this._.index);
                    }
                }