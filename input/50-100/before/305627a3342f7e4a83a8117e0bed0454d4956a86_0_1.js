function() {
        try {
          if (geo_object.type === 'google') {
            editor.goTo(geo_object.geo);
          } else {
            editor.loadGeoJSON(geo_object.geo, true);
          }
          return clearInterval(intvl);
        } catch (_e) {}
      }