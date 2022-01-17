function(source, res) {
      var bounds, center, errorText, key, ne, obj, popupText, resLayer, sw, value, _i, _len, _ref, _ref1;
      bounds = new L.LatLngBounds();
      resLayer = new L.GeoJSON({
        type: 'Feature',
        geometry: res.geometry
      });
      Layer.Utils.extendBounds(bounds, resLayer);
      center = bounds.getCenter();
      sw = bounds.getSouthWest();
      ne = bounds.getNorthEast();
      errorText = L.Util.template(res.text || source.types[res.type].text, res.params);
      popupText = "<div class=\"map-validation-error\">";
      popupText += "<p>" + errorText + "</p>";
      popupText += "<p>";
      popupText += "<a href=\"http://localhost:8111/load_and_zoom?top=" + ne.lat + "&bottom=" + sw.lat + "&left=" + sw.lng + "&right=" + ne.lng + "\" target=\"josm\">" + this.i18n.edit_in_josm + "</a><br />";
      popupText += "<a href=\"http://openstreetmap.org/edit?lat=" + center.lat + "&lon=" + center.lng + "&zoom=17\" target=\"_blank\">" + this.i18n.edit_in_potlatch + "</a><br />";
      popupText += "</p>";
      if (res.objects) {
        popupText += "<p>" + this.i18n.objects + "</p>";
        popupText += "<ul class=\"objects\">";
        _ref = res.objects;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obj = _ref[_i];
          popupText += "<li><a href=\"http://www.openstreetmap.org/browse/" + obj[0] + "/" + obj[1] + "\" target=\"_blank\">" + (obj.join('-')) + "</a></li>";
        }
        popupText += "</ul>";
      }
      if (res.params) {
        popupText += "<p>" + this.i18n.params + "</p>";
        popupText += "<ul class=\"params\">";
        _ref1 = res.params;
        for (key in _ref1) {
          value = _ref1[key];
          popupText += "<li>" + key + ": " + value + "</li>";
        }
        popupText += "</ul>";
      }
      popupText += "</div>";
      resLayer.bindPopup(popupText);
      return resLayer;
    }