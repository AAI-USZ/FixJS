function () {
      var mapStatus = {
        latitude:map.getCenter().lat(),
        longitude:map.getCenter().lng(),
        zoom:map.getZoom()
      };

      $.cookie('mapStatus', JSON.stringify(mapStatus), {expires:cookieExpiration, path: '/'});

    }