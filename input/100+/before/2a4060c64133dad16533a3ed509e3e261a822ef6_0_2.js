function () {
    var options = {};
    this.streetView = new google.maps.StreetViewPanorama(
            this.streetViewPanel.get(0), options);
}