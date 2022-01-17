function(options) {
      return this.setInfoBox(new InfoBox({
        pixelOffset: new google.maps.Size(0)
      }, -20, {
        enableEventPropagation: true,
        closeBoxMargin: "10px",
        disableAutoPan: true,
        boxStyle: {
          cursor: "pointer",
          background: "url(/static/img/infowindow-arrow.png) no-repeat 0 10px",
          width: this.width
        }
      }));
    }