function () {

        return function (x, y) { return this.formatter ? this.formatter(x, y) : x; } .bind(this);

    }