function(val) {
                    if (typeof val === "string") {
                        if (this._.src !== val) {
                            this._.src = val;
                            this._.isloaded = false;
                        }
                    }
                }