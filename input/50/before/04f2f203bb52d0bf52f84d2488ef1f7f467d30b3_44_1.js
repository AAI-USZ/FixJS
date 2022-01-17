function(value) {
                    if (typeof value === "string") {
                        if (this._.src !== value) {
                            this._.src = value;
                            this._.isloaded = false;
                        }
                    }
                }