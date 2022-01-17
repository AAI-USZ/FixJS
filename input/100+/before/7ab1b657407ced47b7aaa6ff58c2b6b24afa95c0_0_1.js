function(markerInfo, otherInfo, isNew, defaultValue) {
      var createInfoWindow, iconPath, iconmid, iconsize, image, isMarkerDraggable, marker, markerVisibility, markersCat, markersType,
        _this = this;
      createInfoWindow = function(marker) {
        var editInfoWindowContent, templateInfo;
        templateInfo = {
          id: marker.__gm_id,
          title: marker["data_translation"][window.LANG]["title"],
          desc: marker["data_translation"][window.LANG]["desc"],
          wikiLink: marker["data_translation"][window.LANG]["link_wiki"],
          hasDefaultValue: marker["hasDefaultValue"],
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
      markersType = otherInfo["markersType"];
      markersCat = otherInfo["markersCat"];
      markerVisibility = markersCat === this.defaultCat || isNew ? true : false;
      if (!(this.markersImages[markersType] != null)) {
        image = new google.maps.MarkerImage(iconPath, null, null, new google.maps.Point(iconmid, iconmid), new google.maps.Size(iconsize, iconsize));
        this.markersImages[markersType] = image;
      }
      isMarkerDraggable = markerInfo.draggable != null ? markerInfo.draggable : false;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
        map: this.map,
        icon: this.markersImages[markersType],
        visible: markerVisibility,
        draggable: isMarkerDraggable,
        cursor: isMarkerDraggable ? "move" : "pointer",
        title: defaultValue != null ? defaultValue[window.LANG]["title"] : markerInfo["data_translation"][window.LANG]["title"],
        animation: isNew ? google.maps.Animation.DROP : false
      });
      if (defaultValue != null) {
        marker["data_translation"] = defaultValue;
        marker["hasDefaultValue"] = true;
      } else {
        marker["data_translation"] = markerInfo["data_translation"];
        marker["hasDefaultValue"] = false;
      }
      marker["type"] = markersType;
      marker["cat"] = markersCat;
      if (markerInfo.lat.toString() === this.startLat && markerInfo.lng.toString() === this.startLng) {
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
      return marker;
    }