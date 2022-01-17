function (decimal) {
        this.negative = decimal < 0 ? true : false;
        this.absolute = Math.abs(decimal);
        this.decimal = decimal;
    }