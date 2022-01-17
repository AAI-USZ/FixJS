function(markerInfo, otherInfo, isNew, defaultValue, callBack) {
      var createInfoWindow, iconPath, iconmid, iconsize, image, isMarkerDraggable, marker, markerType, markersCat, markersType, _j, _len1, _ref, _results,
        _this = this;
      createInfoWindow = function(marker) {
        var editInfoWindowContent, templateInfo;
        templateInfo = {
          id: marker.__gm_id,
          title: marker["title"],
          desc: marker["desc"],
          wikiLink: marker["wikiLink"],
          type: marker.type,
          lat: marker.position.lat(),
          lng: marker.position.lng()
        };
        editInfoWindowContent = _this.editInfoWindowTemplate(templateInfo);
        return marker["infoWindow"] = new CustomInfoWindow(marker, editInfoWindowContent, {
          onClose: function() {
            return _this.currentOpenedInfoWindow = null;
          },
          onOpen: function(infoWindow) {
            return _this.currentOpenedInfoWindow = infoWindow;
          },
          onSave: function(newInfo) {
            return _this.updateMarkerInfos(newInfo);
          },
          deleteCalled: function(marker) {
            return _this.removeMarker(marker.__gm_id, markersType, markersCat);
          },
          moveCalled: function(marker) {
            if (marker.getDraggable()) {
              marker.setDraggable(false);
              return marker.setCursor("pointer");
            } else {
              marker.setDraggable(true);
              return marker.setCursor("move");
            }
          },
          template: _this.editInfoWindowTemplate
        });
      };
      iconsize = 32;
      iconmid = iconsize / 2;
      iconPath = Metadata.icons_path + otherInfo.icon;
      markersType = otherInfo.markersType;
      markersCat = otherInfo.markersCat;
      image = new google.maps.MarkerImage(iconPath, null, null, new google.maps.Point(iconmid, iconmid), new google.maps.Size(iconsize, iconsize));
      isMarkerDraggable = markerInfo.draggable != null ? markerInfo.draggable : false;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
        map: this.map,
        icon: image,
        visible: markersCat === this.defaultCat || (isNew != null) ? true : false,
        draggable: isMarkerDraggable,
        cursor: isMarkerDraggable ? "move" : "pointer",
        title: markerInfo["data_translation"][window.LANG]["title"],
        animation: isNew != null ? google.maps.Animation.DROP : false
      });
      if (!(defaultValue != null)) {
        marker["title"] = markerInfo["data_translation"][window.LANG]["title"];
        marker["desc"] = markerInfo["data_translation"][window.LANG]["desc"];
        marker["wikiLink"] = markerInfo["data_translation"][window.LANG]["wikiLink"];
      } else {
        marker["title"] = defaultValue[window.LANG]["title"];
        marker["desc"] = defaultValue[window.LANG]["desc"];
        marker["wikiLink"] = defaultValue[window.LANG]["wikiLink"];
      }
      marker["type"] = markersType;
      marker["cat"] = markersCat;
      if (markerInfo.lat.toString() === this.getStartLat() && markerInfo.lng.toString() === this.getStartLng()) {
        if (!(marker["infoWindow"] != null)) {
          createInfoWindow(marker);
          marker["infoWindow"].open();
        } else {
          marker["infoWindow"].open();
        }
      }
      google.maps.event.addListener(marker, 'dragend', function(e) {
        _this.saveToLocalStorage();
        if (marker["infoWindow"] != null) {
          return marker["infoWindow"].updatePos();
        }
      });
      google.maps.event.addListener(marker, 'click', function(e) {
        if (marker["infoWindow"] != null) {
          if (_this.currentOpenedInfoWindow === marker["infoWindow"]) {
            return _this.currentOpenedInfoWindow.close();
          } else {
            if (_this.currentOpenedInfoWindow) {
              _this.currentOpenedInfoWindow.close();
            }
            return marker["infoWindow"].open();
          }
        } else {
          createInfoWindow(marker);
          if (_this.currentOpenedInfoWindow) {
            _this.currentOpenedInfoWindow.close();
          }
          return marker["infoWindow"].open();
        }
      });
      _ref = this.gMarker[markersCat]["marker_types"];
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        markerType = _ref[_j];
        if (markerType.slug === markersType) {
          _results.push(markerType["markers"].push(marker));
        }
      }
      return _results;
    }