function (latLngs) {
    if (!latLngs) return null;
    var that = this;
    var latLngs_ = [];
    latLngs.forEach(function (latLng, index, orig) {
        latLngs_.push(that.getArrayFromLatLng(latLng));
    });
    return latLngs_;
}