function(source, res) {
      var bounds, center, errorData, errorTemplate, errorText, key, ne, obj, popupText, resLayer, sw, value, _i, _len, _ref, _ref1, _ref2;
      bounds = new L.LatLngBounds();
      resLayer = new L.GeoJSON({
        type: 'Feature',
        geometry: res.geometry
      });
      Layer.Utils.extendBounds(bounds, resLayer);
      center = bounds.getCenter();
      sw = bounds.getSouthWest();
      ne = bounds.getNorthEast();
      popupText = "<div class=\"map-validation-error\">";
      if (res.text || res.type) {
        errorTemplate = res.text || ((_ref = source.types[res.type]) != null ? _ref.text : void 0) || res.type;
        errorData = res.params || {};
        errorText = errorTemplate.replace(/\{ *([\w_]+) *\}/g, function(str, key) {
          return errorData[key];
        });
        popupText += "<p>" + errorText + "</p>";
      }
      popupText += "<p>";
      popupText += "<a href=\"http://localhost:8111/load_and_zoom?top=" + ne.lat + "&bottom=" + sw.lat + "&left=" + sw.lng + "&right=" + ne.lng + "\" target=\"josm\">" + this.i18n.edit_in_josm + "</a><br />";
      popupText += "<a href=\"http://openstreetmap.org/edit?lat=" + center.lat + "&lon=" + center.lng + "&zoom=17\" target=\"_blank\">" + this.i18n.edit_in_potlatch + "</a><br />";
      popupText += "</p>";
      if (res.objects) {
        popupText += "<p>" + this.i18n.objects + "</p>";
        popupText += "<ul class=\"objects\">";
        _ref1 = res.objects;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          obj = _ref1[_i];
          popupText += "<li><a href=\"http://www.openstreetmap.org/browse/" + obj[0] + "/" + obj[1] + "\" target=\"_blank\">" + (obj.join('-')) + "</a></li>";
        }
        popupText += "</ul>";
      }
      if (res.params) {
        popupText += "<p>" + this.i18n.params + "</p>";
        popupText += "<ul class=\"params\">";
        _ref2 = res.params;
        for (key in _ref2) {
          value = _ref2[key];
          popupText += "<li>" + key + ": " + value + "</li>";
        }
        popupText += "</ul>";
      }
      popupText += "</div>";
      resLayer.bindPopup(popupText);
      return resLayer;
    }