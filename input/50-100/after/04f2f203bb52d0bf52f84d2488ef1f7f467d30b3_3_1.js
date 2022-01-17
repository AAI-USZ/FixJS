function(val) {
                if (typeof val === "string") {
                    if (this._.src !== val) {
                        this._.src = val;
                        this._.isloaded = false;
                    }
                } else if (timbre.platform === "web" && val instanceof File) {
                    this._.src = val;
                    this._.isloaded = false;
                }
            }