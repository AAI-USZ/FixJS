function () {
    var that = this;
    var options = {
        enableCloseButton: true,
        visible: false
    };
    this.streetView = new google.maps.StreetViewPanorama(
            this.streetViewPanel.get(0), options);
    this.googleMap.setStreetView(this.streetView);
    google.maps.event.addListener(this.streetView, "visible_changed", function () {
        if (that.streetView.getVisible())
            that.streetViewPanel.show();
        else
            that.streetViewPanel.hide();
    });
}