function(value) {
                    var f;
                    if (typeof value === "string") {
                        if ((f = Easing.Functions[value]) !== undefined) {
                            this._.type = value;
                            this._.func = f;
                        }
                    } else if (typeof value === "function") {
                        this._.type = "function";
                        this._.func = value;
                    }
                }