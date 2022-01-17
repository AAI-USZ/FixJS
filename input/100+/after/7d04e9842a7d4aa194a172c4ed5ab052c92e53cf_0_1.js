function(e) {
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
      }