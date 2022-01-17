function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.removeFromMap();
    });
}