function(marker, markerData) {
      var hours, point;
      // Add address attributes. Each field has a container with the
      // corresponding class name.
      $.each(['name', 'street', 'postal-code', 'city'], function (i, val) {
        self.infoBox.find('.' + val).text(markerData[val]);
      });

      // Add opening hours.
      hours = self.infoBox.find('.opening-hours').empty();
      $.each(self.weekValues(markerData.nid), function () {
        if (this.label) {
          hours.append('<dt>' + this.label + '</dt>');
        }

        hours.append('<dd>' + this.start_time + ' – ' + this.end_time + '</dd>');
      });

      // Add click handler to make a click on the infobox go to the
      // marker URL, ie. the library page.
      self.infoBox.unbind('click').click(function() {
        window.location = markerData.url;
      });

      // Position and show information box.
      point = self.map.openlayers.getPixelFromLonLat(marker.lonlat);
      self.infoBox.css({ 'left': (point.x - 10) + 'px', 'top': (point.y - self.infoBox.outerHeight()) + 4 + 'px' }).show();
  }