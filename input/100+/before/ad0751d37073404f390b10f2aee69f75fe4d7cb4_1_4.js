function ($) {

/**
 * Prototype for controlling the map.
 */
Drupal.DingLibraryMapController = function (mapId, options) {
  var self = this;
  self.markers = {};
  self.mapId = mapId;
  self.options = options;

  /**
   * Set up the map with markers, etc.
   */
  self.init = function () {
    var iconOffset, iconSize, initLat, initLon;
    // Init should only be run once.
    if (self.isInitialised) { return; }
    self.isInitialised = true;
    self.mapContainer = $("#" + mapId);

    // Get the map object instance from jQuery data.
    self.map = self.mapContainer.data('openlayers');

    // Set up the icons we use for markers.
    iconSize = new OpenLayers.Size(20, 20);

    // Determine the icon's offset, so the tip of the arrow on the icon
    // will be at the marker's location.
    iconOffset = new OpenLayers.Pixel(-10, -15);
    self.icons = {
      'closed': new OpenLayers.Icon(self.options.path + '/markers/marker_closed.png', iconSize, iconOffset),
      'open': new OpenLayers.Icon(self.options.path + '/markers/marker_open.png', iconSize, iconOffset)
    };

    // Draw all the markers on the map.
    self.markersLayer = new OpenLayers.Layer.Markers("Markers");
    self.map.openlayers.addLayer(self.markersLayer);
    $.each(self.options.markers, function (key, markerData) {
      self.markers[key] = self.addMarker(markerData);
    });

    // Add expand/contract control to the map.
    $('<a class="resize expand" href="#">Expand map</a>')
      .appendTo(self.mapContainer)
      .toggle(function (event) {
        self.expandMap();
        return false;
      }, function(event) {
        self.resizeMap(200);
        $(event.target).addClass('expand').removeClass('contract');
        return false;
      });

    // If a position is specified in the URL params, go there.
    initLat = $.url.param('lat');
    initLon = $.url.param('lon');
    if (initLat && initLon) {
      self.map.openlayers.setCenter(self.convertPosition(initLon, initLat));
      self.map.openlayers.zoomTo(15);
      self.expandMap();
      $.scrollTo(self.mapContainer, '500', { offset: -20 });
    }

    // Set up the info bubble that appears when hovering a marker.
    self.infoBox = $('<div id="library-info" style="display: none;">' +
        '<div class="frame">' +
          '<div class="inner">' +
            '<h3 class="name"></h3>' +
            '<div class="address">' +
              '<div class="street"></div>' +
              '<div><span class="postal-code"></span> <span class="city"></span></div>' +
            '</div>' +
            '<dl class="opening-hours"></dl>' +
          '</div>' +
        '</div>' +
      '</div>');

    self.infoBox.appendTo(self.mapContainer);

    // Hide the infobox when the user leaves it. Since it covers the
    // marker, that is a practical way to get rid of it :)
    self.infoBox.bind('mouseleave', function () {
      self.infoBox.hide();
    });

    // Triggers for hiding info: mouseout, resize, zoom, move.
    self.mapContainer.bind('widthchange heightchange zoom move', function () {
      self.infoBox.hide();
    });
  };

  /**
   * Add a marker to the map.
   */
  self.addMarker = function (markerData) {
    var position = new OpenLayers.LonLat(markerData.longitude, markerData.latitude).transform(new OpenLayers.Projection('EPSG:4326'), self.map.openlayers.projection),
        marker = new OpenLayers.Marker(position, self.icons.closed.clone());

    self.markersLayer.addMarker(marker);

    marker.events.register('mouseover', marker, function () {
      self.updateInfoBox(marker, markerData);
    });

    return marker;
  };

  /**
   * Update marker open/closed status.
   */
  self.updateMarkerStatus = function (nid, isOpen) {
    var marker = self.markers['library-' + nid];

    // Bail if marker was not found.
    if (!marker) { return; }

    if (isOpen) {
      marker.icon.setUrl(self.icons.open.url);
    }
    else {
      marker.icon.setUrl(self.icons.closed.url);
    }
  };

  /**
   * Helper function to expand the map to the large size.
   *
   * Mainly used for the expand button, but also called from other places.
   */
  self.expandMap = function () {
    self.resizeMap(450);
    self.mapContainer.find('a.resize').removeClass('expand').addClass('contract');
  };

  /**
   * Resize the map to a new size.
   *
   * Currently, only the height can be changed.
   */
  self.resizeMap = function (height) {
    var center = self.map.openlayers.getCenter();

    if (self.infoBox) {
      self.infoBox.hide();
    }

    // The height is some times set on both the map container and the
    // parent. This causes issues with resing, so remove it.
    self.mapContainer.parent().height('auto');

    self.mapContainer.animate({'height': height + 'px'}, 1000, 'swing', function () {
      self.map.openlayers.updateSize();
      self.map.openlayers.panTo(center);
    });
  };

  /**
   * Generates a LonLat object from lon and lat parameters.
   *
   * These are transformed to our current map projection.
   */
  self.convertPosition = function (lon, lat) {
    var position = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection('EPSG:4326'), self.map.openlayers.projection);

    return position;
  };

  /**
   * Update the infobox for the marker being hovered on.
   */
  self.updateInfoBox = function(marker, markerData) {
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
  };

  // Initialize the map if OpenLayers is available.
  if (OpenLayers) {
    self.init();
  }

  return self;
};

/**
 * Set up a behavior for configuring the library map.
 */
Drupal.behaviors.openlayersDingLibraryMap = function (context) {
  // Make sure this behavior is run only once.
  if (Drupal.settings.dingLibraryMap.initialised) { return; }

  // If OpenLayers is not done initialising yet, we wait for a while and
  // try again.
  if (!$('#library-map').data('openlayers')) {
    window.setTimeout(Drupal.behaviors.openlayersDingLibraryMap, 100);
    return;
  }
  Drupal.settings.dingLibraryMap.initialised = true;

  var lmc = new Drupal.DingLibraryMapController('library-map', Drupal.settings.dingLibraryMap);

  // On the page with the library list, there are links to view the
  // library on the map on each list item. We want to catch those clicks
  // and move the map to the area in question.
  $('#content-main .view-on-map-link').click(function () {
    var link = $(this),
        href = link.attr('href'),
        latMatch = /lat=(\d+\.?\d*)/.exec(href),
        lonMatch = /lon=(\d+\.?\d*)/.exec(href);

    // If we have coordinates for both dimensions, center the map and
    // scroll the browser to it.
    if (latMatch[1] && lonMatch[1]) {
      lmc.map.openlayers.setCenter(lmc.convertPosition(lonMatch[1], latMatch[1]));
      lmc.map.openlayers.zoomTo(15);
      lmc.expandMap();
      $.scrollTo(lmc.mapContainer, '500', { offset: -20 });
    }

    return false;
  });

  $('body').bind('DingLibraryStatusChange', function (event, nid, isOpen) {
    lmc.updateMarkerStatus(nid, isOpen);
  });
};

}