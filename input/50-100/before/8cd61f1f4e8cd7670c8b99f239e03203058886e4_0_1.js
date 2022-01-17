function (decimal) {

        if (!(decimal < 0 || decimal >= 0)) {
            decimal = parseFloat(decimal);
        }
        this.negative = decimal < 0 ? true : false;
        this.absolute = Math.abs(decimal);
        this.decimal = decimal;
    }