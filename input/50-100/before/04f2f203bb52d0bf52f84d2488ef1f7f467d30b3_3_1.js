function(value) {
                if (typeof value === "string") {
                    if (this._.src !== value) {
                        this._.src = value;
                        this._.isloaded = false;
                    }
                } else if (timbre.platform === "web" && value instanceof File) {
                    this._.src = value;
                    this._.isloaded = false;
                }
            }