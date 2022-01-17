function(value) {
                    if (typeof value === "object" && 
                        (value instanceof Array ||
                         value.buffer instanceof ArrayBuffer)) {
                        this._.value = compile(value);
                        this._.index = 0;
                    }
                }