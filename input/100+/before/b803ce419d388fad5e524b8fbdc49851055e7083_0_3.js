function CustomMap(id) {
      this.handleAddTool = __bind(this.handleAddTool, this);

      this.handleExport = __bind(this.handleExport, this);

      this.sendMapForApproval = __bind(this.sendMapForApproval, this);

      this.destroyLocalStorage = __bind(this.destroyLocalStorage, this);

      var _this = this;
      this.localStorageKey = "gw2c_markers_config_01";
      this.blankTilePath = 'tiles/00empty.jpg';
      this.iconsPath = 'assets/images/icons/32x32';
      this.maxZoom = 7;
      this.appState = "read";
      this.html = $('html');
      this.lngContainer = $('#long');
      this.latContainer = $('#lat');
      this.devModInput = $('#dev-mod');
      this.addMarkerLink = $('#add-marker');
      this.exportBtn = $('#export');
      this.exportWindow = $('#export-windows');
      this.markersOptionsMenu = $('#markers-options');
      this.mapOptions = $('#edition-tools a');
      this.defaultLat = 26.765230565697536;
      this.defaultLng = -36.32080078125;
      this.defaultCat = "explore";
      window.LANG = "en";
      this.areaSummaryBoxes = [];
      this.markersImages = {};
      this.draggableMarker = false;
      this.visibleMarkers = true;
      this.canToggleMarkers = true;
      this.currentOpenedInfoWindow = false;
      this.gMapOptions = {
        center: new google.maps.LatLng(this.getStartLat(), this.getStartLng()),
        zoom: 6,
        minZoom: 3,
        maxZoom: this.maxZoom,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ["custom", google.maps.MapTypeId.ROADMAP]
        },
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          zoomControlStyle: google.maps.ZoomControlStyle.SMALL
        }
      };
      this.customMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord, path;
          normalizedCoord = coord;
          if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
            return path = 'tiles/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
          } else {
            return _this.blankTilePath;
          }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: this.maxZoom,
        name: 'GW2 Map'
      });
      this.map = new google.maps.Map($(id)[0], this.gMapOptions);
      this.map.mapTypes.set('custom', this.customMapType);
      this.map.setMapTypeId('custom');
      $.get('assets/javascripts/templates/confirmBox._', function(e) {
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
          _this.editInfoWindowTemplate = "";
          return $.get('assets/javascripts/templates/customInfoWindow._', function(e) {
            _this.editInfoWindowTemplate = _.template(e);
            _this.setAllMarkers();
            _this.initializeAreaSummaryBoxes();
            $('#destroy').bind('click', _this.destroyLocalStorage);
            return $('#send').bind('click', _this.sendMapForApproval);
          });
        });
      });
    }