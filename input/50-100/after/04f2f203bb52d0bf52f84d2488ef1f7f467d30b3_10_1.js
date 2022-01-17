function(val) {
                    var f;
                    if (typeof val === "string") {
                        if ((f = Easing.Functions[val]) !== undefined) {
                            this._.type = val;
                            this._.func = f;
                        }
                    } else if (typeof val === "function") {
                        this._.type = "function";
                        this._.func = val;
                    }
                }