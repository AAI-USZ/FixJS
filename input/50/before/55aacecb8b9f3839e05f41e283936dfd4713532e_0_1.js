function () {
        if (this.rest === undefined) {
            return 1;
        } else {
            return 1 + this.rest.length();
        }
    }