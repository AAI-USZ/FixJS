function(e) {
      var coord, defaultValue, getValue, icon, markerCat, markerLink, markerType, newMarker, newMarkerInfo, otherInfo, parent, this_,
        _this = this;
      this_ = $(e.currentTarget);
      parent = this_.closest('.type-menu-item');
      markerLink = parent.find('.marker-type-link');
      markerType = markerLink.attr('data-type');
      markerCat = markerLink.attr('data-cat');
      icon = markerLink.attr('data-icon');
      coord = this.map.getCenter();
      getValue = function(cat, type) {
        var defaultValue;
        defaultValue = null;
        if ((_this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["desc"] != null) && (_this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["title"] != null)) {
          defaultValue = $.extend(true, {}, _this.MarkersConfig[cat]["marker_types"][type]["data_translation"]);
        }
        return defaultValue;
      };
      defaultValue = getValue(markerCat, markerType);
      otherInfo = {
        markersCat: markerCat,
        markersType: markerType,
        icon: icon
      };
      if (defaultValue) {
        newMarkerInfo = {
          lat: coord.lat(),
          lng: coord.lng(),
          draggable: true
        };
      } else {
        newMarkerInfo = {
          lat: coord.lat(),
          lng: coord.lng(),
          data_translation: {
            en: {
              title: "",
              desc: "",
              wikiLink: ""
            },
            fr: {
              title: "",
              desc: "",
              wikiLink: ""
            }
          },
          draggable: true
        };
      }
      newMarker = this.addMarker(newMarkerInfo, otherInfo, true, defaultValue);
      return this.gMarker[markerCat]["marker_types"][markerType]["markers"].push(newMarker);
    }