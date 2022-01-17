function(latlng, mapHtml, slideHtml) {
      if (arguments.length == 1 && arguments[0] instanceof Array) {
        for (var i=0; i<arguments[0].length; i++) {
          methods.add.apply(this, arguments[0][i]);
        }
        return;
      }

      // add to map
      var latlng = new L.LatLng(latlng[0], latlng[1]);
      var marker = new L.Marker(latlng).bindPopup(mapHtml);
      marker.index = DATA.items.length;
      marker.on('click', function(e) {
        methods.move(e.target.index, true);
      });
      DATA.markergroup.addLayer(marker);

      // render to slide
      var slidesCt = $THIS.find('.smapp-slides-ct');
      var slide = $('<div class="slide"><div class="slide-inner">'+slideHtml+'</div></div>').appendTo(slidesCt);

      // calculate arrow compass for the marker
      var compass = DATA.options.exploreMode ? _getCompass(marker) : false;

      // store data in markers array
      DATA.items.push({
        marker:  marker,
        slide:   slide,
        compass: compass
      });

      // refresh or show the current popup
      if (DATA.items.length == 1) {
        DATA.index = 0;
        DATA.items[0].slide.addClass('active');
        _autoHeight(DATA.items[0].slide, false);
      }
      if (DATA.items.length == 2) {
        $THIS.find('.ctrl-right').addClass('active');
      }
      $THIS.find('.ctrl-count').html(DATA.index+1 + ' of ' + DATA.items.length);
      _showPopup(DATA.items[DATA.index].marker);
    }