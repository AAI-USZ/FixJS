function () {
    if (window.console) console.log("Initializing StreetView support.");
    this.streetViewPanel = $("<div>").addClass("map-panel");
    this.googleMap.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
            this.streetViewPanel.get(0));
    this.streetViewPanel.hide();
}