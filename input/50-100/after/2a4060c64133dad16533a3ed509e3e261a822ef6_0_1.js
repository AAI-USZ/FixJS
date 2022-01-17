function () {
    if (window.console) console.log("Initializing StreetView support.");
    this.streetViewPanel = $("<div>").addClass("map-panel").height("100%").width("50%");
    this.googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(
            this.streetViewPanel.get(0));
    this.streetViewPanel.hide();
    this._createStreetViewObject();
}