function(e) {
        var closeCurrentInfoWindow, editInfoWindowContent, templateInfo;
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
              templateInfo = {
                id: marker.__gm_id,
                title: marker.title,
                desc: marker.desc,
                type: marker.type,
                wikiLink: marker.wikiLink
              };
              editInfoWindowContent = _this.editInfoWindowTemplate(templateInfo);
              marker["infoWindow"] = new CustomInfoWindow(marker, editInfoWindowContent, {
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
              if (_this.currentOpenedInfoWindow) {
                _this.currentOpenedInfoWindow.close();
              }
              return marker["infoWindow"].open();
            }
        }
      }