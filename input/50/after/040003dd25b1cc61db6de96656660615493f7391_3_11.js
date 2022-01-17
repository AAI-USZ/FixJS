function (opts) {
    var options = opts || {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
    };
    this.setOverlay(new google.maps.Marker(options));
}