function(value) {
                    var _ = this._;
                    if (typeof value === "number") {
                        value = value|0;
                        if (value < 0) value = _.value.length + value;
                        if (0 <= value && value < _.value.length) {
                            _.index = value;
                            changeTheValue.call(this, value);
                        }
                    }
                }