function(data) {

        var latlng = new L.LatLng(data.lat,data.lng)
          , position = this.map.layerPointToContainerPoint(this.map.latLngToLayerPoint(latlng));


        // Fake hover
        this.hoverCircle.setLatLng(latlng);

        switch (data.price) {
          case "$$": color="#FAEC1F"; break;
          case "$$$": color="#EAA226"; break;
          case "$$$$": color="#DB592E"; break;
          case "$$$$$": color="#CB0F35"; break;
          default: color = "white";
        }

        this.hoverCircle.setStyle({fillColor: color, weight: 5});
        this.hoverCircle.setRadius(6);
        this.map.addLayer(this.hoverCircle);

        debugger;

        this.$tooltip
          .html(_.template(this.options.tooltip_template,data));

        var h = this.$tooltip.outerHeight()
          , w = this.$tooltip.outerWidth();

        this.$tooltip.css({
          top: (position.y - h - 20) + "px",
          left: (position.x - (w/2) - 5) + "px"
        })
        .show();
      }