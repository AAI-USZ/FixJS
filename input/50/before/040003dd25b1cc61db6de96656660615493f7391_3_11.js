function (opts) {
    var options = opts || {
        clickable: true,
        zIndex: this.getDefaultZIndex(),
    };
    this.setObject(new google.maps.Marker(options));
}