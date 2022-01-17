function(val) {
                    if (typeof val === "object" && 
                        (val instanceof Array ||
                         val.buffer instanceof ArrayBuffer)) {
                        this._.value = compile(val);
                        this._.index = 0;
                    }
                }