function(markerInfo, markersType, markersCat) {
      var createInfoWindow, iconmid, iconsize, image, isMarkerDraggable, marker, markerType, _j, _len1, _ref, _results,
        _this = this;
      createInfoWindow = function(marker) {
        var editInfoWindowContent, templateInfo;
        templateInfo = {
          id: marker.__gm_id,
          title: marker.title,
          desc: marker.desc,
          type: marker.type,
          lat: marker.position.lat(),
          lng: marker.position.lng(),
          wikiLink: marker.wikiLink
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
          template: _this.editInfoWindowTemplate
        });
      };
      iconsize = 32;
      iconmid = iconsize / 2;
      image = new google.maps.MarkerImage(this.getIconURLByType(markersType, markersCat), null, null, new google.maps.Point(iconmid, iconmid), new google.maps.Size(iconsize, iconsize));
      isMarkerDraggable = markerInfo.draggable != null ? markerInfo.draggable : false;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
        map: this.map,
        icon: image,
        visible: markersCat === this.defaultCat ? true : false,
        draggable: isMarkerDraggable,
        cursor: isMarkerDraggable ? "move" : "pointer",
        title: "" + markerInfo.title
      });
      marker["title"] = "" + markerInfo.title;
      marker["desc"] = "" + markerInfo.desc;
      marker["wikiLink"] = "" + markerInfo.wikiLink;
      marker["type"] = "" + markersType;
      marker["cat"] = "" + markersCat;
      google.maps.event.addListener(marker, 'dragend', function(e) {
        _this.saveToLocalStorage();
        if (marker["infoWindow"] != null) {
          return marker["infoWindow"].updatePos();
        }
      });
      if (markerInfo.lat.toString() === this.getStartLat() && markerInfo.lng.toString() === this.getStartLng()) {
        if (!(marker["infoWindow"] != null)) {
          createInfoWindow(marker);
          marker["infoWindow"].open();
        } else {
          marker["infoWindow"].open();
        }
      }
      google.maps.event.addListener(marker, 'click', function(e) {
        var closeCurrentInfoWindow;
        closeCurrentInfoWindow = function() {};
        switch (_this.appState) {
          case "remove":
            return _this.removeMarker(marker.__gm_id, markersType, markersCat);
          case "move":
            if (marker.getDraggable()) {
              marker.setDraggable(false);
              return marker.setCursor("pointer");
            } else {
              marker.setDraggable(true);
              return marker.setCursor("move");
            }
            break;
          default:
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
        }
      });
      _ref = this.gMarker[markersCat]["markerGroup"];
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        markerType = _ref[_j];
        if (markerType.slug === markersType) {
          _results.push(markerType["markers"].push(marker));
        }
      }
      return _results;
    }