function(marker, markerData) {
      var day, days, section, sectionDays, nextDay, startTime, endTime, startDay, endDay, point;
      // Add address attributes. Each field has a container with the
      // corresponding class name.
      $.each(['name', 'street', 'postal-code', 'city'], function (i, val) {
        self.infoBox.find('.' + val).text(markerData[val]);
      });

      //Add opening hours
      section = self.infoBox.find('.opening-hours').empty();
      days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; //collection of weekdays to use for iteration
      day = 0; //current day index
       //iterate until end of week
      while (day < days.length) {
        sectionDays = [days[day]]; //add current day to to section
        nextDay = day + 1;

        if (markerData.opening_hours[[days[day]]] &&
            markerData.opening_hours[[days[day]]].length > 0) {
          startTime = markerData.opening_hours[[days[day]]][0].open;
          endTime = markerData.opening_hours[[days[day]]][0].close;

          while ( (nextDay < days.length) &&
                  (markerData.opening_hours[[days[nextDay]]].length > 0) &&
                  (startTime !== null) && (endTime !== null) &&
                  (startTime == markerData.opening_hours[[days[nextDay]]][0].open) &&
                  (endTime == markerData.opening_hours[[days[nextDay]]][0].close)) {
            sectionDays.push(days[nextDay]); //if following days have same hours as current day then add these days to section
            nextDay += 1;
          }

          if (sectionDays.length > 1) {
            startDay = self.options.shortDayNames[sectionDays.shift()];
            endDay = self.options.shortDayNames[sectionDays.pop()];
            sectionDays = startDay.substr(0, 1).toUpperCase()+startDay.substr(1)+'-'+endDay.substr(0, 1).toUpperCase()+endDay.substr(1); //use short day names if section spans more than one day
          }
          else {
            sectionDays = self.options.fullDayNames[sectionDays.shift()]; //use full day name for section spanning a single day
          }

          startTime = (startTime !== null) ? startTime.substr(0, startTime.lastIndexOf(':')) : '';
          endTime = (endTime !== null) ? endTime.substr(0, endTime.lastIndexOf(':')) : '';

          //add section to opening hours container
          section.append('<dt>'+sectionDays+'</dt>');
          section.append( '<dd>'+
                            startTime +' - '+endTime+
                          '</dd>');
        }

        day = nextDay; //step to day after last day in current section
      }

      // Add click handler to make a click on the infobox go to the
      // marker URL, ie. the library page.
      self.infoBox.unbind('click').click(function() {
        window.location = markerData.url;
      });

      // Position and show information box.
      point = self.map.openlayers.getPixelFromLonLat(marker.lonlat);
      self.infoBox.css({ 'left': (point.x - 10) + 'px', 'top': (point.y - self.infoBox.outerHeight()) + 4 + 'px' }).show();
  }