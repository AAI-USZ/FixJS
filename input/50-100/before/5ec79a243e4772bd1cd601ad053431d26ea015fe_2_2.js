function (opts) {
    var options = opts || {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
        fillColor: this.getBackgroundColor(),
        fillOpacity: this.getBackgroundOpacity(),
        strokeColor: this.getBorderColor(),
        strockOpacity: this.getBorderOpacity(),
        strokeWeight: this.getBorderSize()
    };
    this.object_ = new google.maps.Polygon(options);
}