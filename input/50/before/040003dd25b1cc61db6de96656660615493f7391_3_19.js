function (opts) {
    var options = opts || {
        clickable: true,
        visible: true,
        zIndex: this.getDefaultZIndex(),
    };
    this.setObject(new MultiMarker(options));
}