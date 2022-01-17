function () {
    var komooMap = this;
    var infoWindowOptions = {
        pixelOffset: new google.maps.Size(0, -20),
        closeBoxMargin: '10px',
        boxStyle: {
            cursor: 'pointer',
            background: 'url(/static/img/infowindow-arrow.png) no-repeat 0 10px', // TODO: Hardcode is evil
            width: '200px'
        }
    };
    this.tooltip = new InfoBox(infoWindowOptions);
    google.maps.event.addDomListener(this.tooltip, "domready", function (e) {
        var closeBox = komooMap.tooltip.div_.firstChild;
        $(closeBox).hide();  // Removes the close button.
        google.maps.event.addDomListener(closeBox, "click", function (e) {
            // Detach the feature from infowindow when close it.
            komooMap.tooltip.feature = undefined;
        });
        google.maps.event.addDomListener(komooMap.tooltip.div_, "click", function (e) {
            google.maps.event.trigger(komooMap.tooltip.feature, "click", {latLng: komooMap.tooltip.getPosition()});
        });
    });


    this.tooltip.title = $("<span>");
    this.tooltip.content = $("<div>").addClass("map-infowindow-content");
    this.tooltip.content.append(this.tooltip.title);

    var css = {
        background: "white",
        padding: "10px",
        margin: "0 0 0 15px"
    };
    this.tooltip.content.css(css);
    this.tooltip.setContent(this.tooltip.content.get(0));

    this.infoWindow = komoo.controls.makeInfoWindow({map: this});
}