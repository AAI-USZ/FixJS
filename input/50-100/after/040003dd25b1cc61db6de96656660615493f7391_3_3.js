function (opts) {
    var options = opts || {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
        strokeColor: this.getBorderColor(),
        strockOpacity: this.getBorderOpacity(),
        strokeWeight: this.getBorderSize()
    };
    this.options_ = options;
    this.setOverlay(new MultiPolyline(options));
}