function (latLng) {
    var komooMap = this;
    if (!this.radiusCircle) {
        this.radiusCircle = new google.maps.Circle({
                visible: true,
                radius: 100,
                fillColor: "white",
                fillOpacity: 0.0,
                strokeColor: "#ffbda8",
                zIndex: -1
        });

        google.maps.event.addListener(this.radiusCircle, "click", function(e) {
            if (komooMap.mode == komoo.Mode.SELECT_CENTER) {
                komooMap._emit_center_selected(e.latLng);
            }
        });
        this.radiusCircle.setMap(this.googleMap);
    }
    if (!this.centerMarker) {
        this.centerMarker = new google.maps.Marker({
                visible: true,
                icon: "/static/img/marker.png",
                zIndex: 4
        });
        this.centerMarker.setMap(this.googleMap);
    }
    this.centerMarker.setPosition(latLng);
    this.radiusCircle.setCenter(latLng);
    /**
     * @name komoo.Map#center_selecter
     * @event
     */
    this.event.trigger("center_selected", [latLng, this.radiusCircle]);
    this.setMode(null);
}