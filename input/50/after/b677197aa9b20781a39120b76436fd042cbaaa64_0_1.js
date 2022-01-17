function(opt_precision) {
    this.values = [];
    this.precision = 1;
    this.enable3D_ = true;
    if (this.opt_precision) {
        this.setPrecision(/** @type {number} */ (opt_precision));
    }
}