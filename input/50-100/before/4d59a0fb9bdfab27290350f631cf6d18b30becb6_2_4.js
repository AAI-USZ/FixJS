function (pos) {
    if (!pos) return null;
    var that = this;
    var pos_ = [];
    pos.forEach(function (p, index, orig) {
        pos_.push(that.getLatLngFromArray(p));
    });
    return pos_;
}