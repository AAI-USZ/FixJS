function CustomMap(id) {
      this.toggleMarkerList = __bind(this.toggleMarkerList, this);

      this.handleEdition = __bind(this.handleEdition, this);

      this.handleAddTool = __bind(this.handleAddTool, this);

      this.handleExport = __bind(this.handleExport, this);

      this.handleMarkerRemovalTool = __bind(this.handleMarkerRemovalTool, this);

      var _this = this;
      this.localStorageKey = "gw2c_markers_config_01";
      this.MarkersConfig = Markers;
      this.blankTilePath = 'tiles/00empty.jpg';
      this.iconsPath = 'assets/images/icons/32x32';
      this.maxZoom = 7;
      this.appState = "read";
      this.html = $('html');
      this.lngContainer = $('#long');
      this.latContainer = $('#lat');
      this.devModInput = $('#dev-mod');
      this.optionsBox = $('#options-box');
      this.addMarkerLink = $('#add-marker');
      this.removeMarkerLink = $('#remove-marker');
      this.markerList = $('#marker-list');
      this.exportBtn = $('#export');
      this.exportWindow = $('#export-windows');
      this.markersOptionsMenu = $('#markers-options');
      this.editionsTools = $('#edition-tools a');
      this.defaultLat = 26.765230565697536;
      this.defaultLng = -36.32080078125;
      this.defaultCat = "generic";
      $.get('assets/javascripts/templates/confirmBox._', function(e) {
        var template;
        template = _.template(e);
        return _this.confirmBox = new Confirmbox(template);
      });
      this.areaSummaryBoxes = [];
      this.editInfowindowTemapl;
      this.canRemoveMarker = false;
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
      this.addMenuIcons(function() {
        _this.addTools = $('.menu-marker a.add');
        return _this.addTools.each(function(index, target) {
          return $(target).bind('click', _this.handleAddTool);
        });
      });
      google.maps.event.addListener(this.map, 'zoom_changed', function(e) {
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
      this.gMarker = {};
      this.editInfoWindowTemplate = "";
      $.get('assets/javascripts/templates/customInfoWindow._', function(e) {
        _this.editInfoWindowTemplate = _.template(e);
        _this.setAllMarkers();
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
        _this.editionsTools.bind('click', _this.handleEdition);
        return _this.exportWindow.find('.close').click(function() {
          return _this.exportWindow.hide();
        });
      });
    }