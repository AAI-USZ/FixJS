function () {
        if (!this.rest) {
            return 1;
        } else {
            return 1 + this.rest.length();
        }
    }