function (opts) {
    var options = opts || {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
        strokeColor: this.getBorderColor(),
        strockOpacity: this.getBorderOpacity(),
        strokeWeight: this.getBorderSize()
    };
    this.setObject(new google.maps.Polyline(options));
}