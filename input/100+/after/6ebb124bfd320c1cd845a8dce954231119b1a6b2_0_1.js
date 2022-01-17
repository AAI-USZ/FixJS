function(e) {
        var template;
        template = _.template(e);
        _this.confirmBox = new Confirmbox(template);
        return _this.handleLocalStorageLoad(function() {
          _this.addMenuIcons(function() {
            _this.addTools = $('.menu-marker a.add');
            return _this.addTools.each(function(index, target) {
              return $(target).bind('click', _this.handleAddTool);
            });
          });
          google.maps.event.addListener(_this.map, 'zoom_changed', function(e) {
            var zoomLevel;
            zoomLevel = _this.map.getZoom();
            if (zoomLevel === 4) {
              _this.canToggleMarkers = false;
              _this.hideMarkersOptionsMenu();
              _this.setAllMarkersVisibility(false);
              _this.setAreasInformationVisibility(true);
              if (_this.currentOpenedInfoWindow) {
                return _this.currentOpenedInfoWindow.close();
              }
            } else if (zoomLevel > 4) {
              _this.canToggleMarkers = true;
              _this.showMarkersOptionsMenu();
              _this.setAllMarkersVisibility(true);
              return _this.setAreasInformationVisibility(false);
            } else if (zoomLevel < 4) {
              _this.canToggleMarkers = false;
              _this.hideMarkersOptionsMenu();
              _this.setAllMarkersVisibility(false);
              _this.setAreasInformationVisibility(false);
              if (_this.currentOpenedInfoWindow) {
                return _this.currentOpenedInfoWindow.close();
              }
            }
          });
          _this.gMarker = {};
          _this.currentMapVersion = 1;
          _this.editInfoWindowTemplate = "";
          return $.get('assets/javascripts/templates/customInfoWindow._', function(e) {
            _this.editInfoWindowTemplate = _.template(e);
            _this.setAllMarkers();
            _this.initializeAreaSummaryBoxes();
            google.maps.event.addListener(_this.map, 'click', function(e) {
              return console.log("Lat : " + (e.latLng.lat()) + ", Lng : " + (e.latLng.lng()));
            });
            $('#destroy').bind('click', _this.destroyLocalStorage);
            return $('#send').bind('click', _this.sendMapForApproval);
          });
        });
      }