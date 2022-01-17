function (opts) {
    var options = opts || {
        clickable: true,
        visible: true,
        zIndex: this.getDefaultZIndex(),
    };
    this.object_ = new MultiMarker(options);
}