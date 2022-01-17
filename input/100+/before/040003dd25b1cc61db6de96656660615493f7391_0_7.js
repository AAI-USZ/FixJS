function (element, options) {
    var komooMap = this;
    // options should be an object.
    if (typeof options !== "object") {
        options = {};
    }
    this.drawingMode = {};
    this.drawingMode[komoo.OverlayType.POINT] = google.maps.drawing.OverlayType.MARKER;
    this.drawingMode[komoo.OverlayType.POLYGON] = google.maps.drawing.OverlayType.POLYGON;
    this.drawingMode[komoo.OverlayType.POLYLINE] = google.maps.drawing.OverlayType.POLYLINE;

    // Join default option with custom options.
    var googleMapOptions = $.extend(komoo.MapOptions.googleMapOptions,
                                    options.googleMapOptions);
    // TODO: init overlay options
    // Initializing some properties.
    this.mode = null;
    this.fetchedTiles = {};
    this.loadedOverlays = {};
    this.options = $.extend(komoo.MapOptions, options);
    this.drawingManagerOptions = {};
    this.overlayOptions = {};
    this.overlays = komoo.collections.makeFeatureCollection({map: this});
    this.keptOverlays = komoo.collections.makeFeatureCollection({map: this});
    this.newOverlays = komoo.collections.makeFeatureCollection({map: this});
    this.loadedOverlays = {};
    this.overlaysByType = {};
    this.initOverlaysByTypeObject();
    // Creates a jquery selector to use the jquery events feature.
    this.event = $("<div>");
    // Creates the Google Maps object.
    this.googleMap = new google.maps.Map(element, googleMapOptions);
    // Uses Tiles to get data from server.
    this.serverFetchMapType = new komoo.ServerFetchMapType(this);
    this.googleMap.overlayMapTypes.insertAt(0, this.serverFetchMapType);
    this.wikimapiaMapType = new komoo.WikimapiaMapType(this);
    //this.googleMap.overlayMapTypes.insertAt(0, this.wikimapiaMapType);
    this.initMarkerClusterer();
    // Create the simple version of toolbar.
    this.editToolbar = $("<div>").addClass("map-toolbar").css("margin", "5px");
    this.initInfoWindow();
    this.setEditable(this.options.editable);
    this.initCustomControl();
    this.initStreetView();
    if (this.options.useGeoLocation) {
        this.goToUserLocation();
    }
    if (this.options.autoSaveMapType) {
        this.useSavedMapType();
    }
    this.handleEvents();
    // Geocoder is used to search locations by name/address.
    this.geocoder = new google.maps.Geocoder();
    if (komoo.onMapReady) {
        komoo.onMapReady(this);
    }

    this.cleanMapType = new google.maps.StyledMapType([
        {
            featureType: "poi",
            elementType: "all",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            featureType: "road",
            elementType: "all",
            stylers: [
                {lightness: 70}
            ]
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [
                {lightness: 50}
            ]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [
                {lightness: 50}
            ]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                {lightness: 30}
            ]
        }
    ], {
        name: gettext("Clean")
    });

    this.googleMap.mapTypes.set(komoo.CLEAN_MAPTYPE_ID, this.cleanMapType);
    this.initEvents();
}