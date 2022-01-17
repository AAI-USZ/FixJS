function(e) {
            _this.editInfoWindowTemplate = _.template(e);
            _this.test = 0;
            _this.countTotalMarker();
            _this.setAllMarkers(function() {
              return console.log("finish");
            });
            _this.initializeAreaSummaryBoxes();
            _this.markerList.find('span').bind('click', function(e) {
              var coord, img, markerType, markerinfo, this_;
              this_ = $(e.currentTarget);
              markerType = this_.attr('data-type');
              coord = _this.map.getCenter();
              markerinfo = {
                "lng": coord.lng(),
                "lat": coord.lat(),
                "title": "--"
              };
              img = "" + _this.iconsPath + "/" + markerType + ".png";
              return _this.addMarkers(markerinfo, img, markerType);
            });
            _this.addMarkerLink.bind('click', _this.toggleMarkerList);
            _this.removeMarkerLink.bind('click', _this.handleMarkerRemovalTool);
            _this.exportBtn.bind('click', _this.handleExport);
            $('#destroy').bind('click', _this.destroyLocalStorage);
            $('#send').bind('click', _this.sendMapForApproval);
            return _this.exportWindow.find('.close').click(function() {
              return _this.exportWindow.hide();
            });
          }