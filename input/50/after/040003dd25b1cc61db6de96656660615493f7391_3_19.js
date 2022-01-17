function (opts) {
    var options = opts || {
        clickable: true,
        visible: true,
        zIndex: this.getDefaultZIndex(),
    };
    this.setOverlay(new MultiMarker(options));
}