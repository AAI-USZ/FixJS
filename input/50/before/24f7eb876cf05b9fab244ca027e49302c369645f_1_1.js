function() {
        if(this.options.map === undefined) {
            throw new Exception("you should specify a map model");
        }
        this.map = this.options.map;
    }