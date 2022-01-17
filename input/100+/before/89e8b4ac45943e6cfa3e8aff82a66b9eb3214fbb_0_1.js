function(marker) {
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
      }