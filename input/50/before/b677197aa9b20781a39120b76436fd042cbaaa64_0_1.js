function(opt_precision) {
    this.values = [];
    this.precision = 1;
    if (this.opt_precision) {
        this.setPrecision(/** @type {number} */ (opt_precision));
    }
}