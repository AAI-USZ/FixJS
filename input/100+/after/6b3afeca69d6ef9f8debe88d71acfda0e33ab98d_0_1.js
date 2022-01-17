function(elem)
        {
            if (elem instanceof jQuery) {
                elem = elem[0];
            }

            _elem = elem;

            Log('info', "Map initialized!");

            // 40.0024331757129, 269.88193994140624, 5 => All of US
            // 37.70751808422908, -122.1353101196289, 11 => Bay Area
            var lat = 40.0024331757129;
            var lng = 269.88193994140624;

            var mapStyle = _this.getStyle();

            _map = new google.maps.Map(_elem, {
                center: new google.maps.LatLng(lat, lng),
                zoom: 2,
                minZoom: 2,
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                overviewMapControl: false,
                rotateControl: false,
                scaleControl: false,
                streetViewControl: false,
                center_changed: onCenterChanged,
                mapTypeIds: 'mapStyle'
            });

            _map.mapTypes.set('map_style', mapStyle);
            _map.setMapTypeId('map_style');

            //Create clusterer object

            var gm = google.maps;
            _markerCluster = new MarkerClusterer(_map, [], {maxZoom:19})

            _oms = new OverlappingMarkerSpiderfier(_map);
            var iw = new gm.InfoWindow();
            _oms.addListener('click', function(marker) {
                iw.setContent(marker.desc);
                iw.open(_map, marker);
                var pin = _this.Pins.getPinRef(marker.markerID);
                pin.onClick.apply();
                console.log(pin);
            });


            $.getScript('http://j.maxmind.com/app/geoip.js', function()
            {
                lat = geoip_latitude();
                lon = geoip_longitude();
                Log('info', 'GeoIP detected as ' + lat + ', ' + lon);
                if (!_centerInitialized)
                {
                    _this.center(lat, lon);
                    _this.zoom(9);
                }
            });


            $(document).mouseup(function(){
                onMouseUp();
                Log('debug', 'Mouse up!');
            });

            // Tracking
            _this.onPan.register(function(){
                Log('info', 'Centering map on [' + _this.getCenter()[0] + ',' + _this.getCenter()[1] + ']');
                mixpanel.track('pan');
            });

            _this.onZoom.register(function(){
                Log('info', 'Zooming map to ' + _this.getZoom());
                mixpanel.track('zoom');
                mixpanel.track('zoom_' + _this.getZoom());
            });

            // TODO: We can't specify a max bounds in the map control, but it's annoying to have the map pan off the screen.
            //       We should implement something like this: http://stackoverflow.com/questions/3125065/how-do-i-limit-panning-in-google-maps-api-v3

            _map.zoom_changed = _this.onZoom.apply;
            _map.drag_ended = _this.onPan.apply;

            _this.Pins.onPinAdd.register(onPinAdd);
            _this.Pins.onPinUpdate.register(onPinUpdate);
            _this.Pins.onPinRemove.register(onPinRemove);

            _this.onPan.register(_this.onBoundsChange.apply);
            _this.onZoom.register(_this.onBoundsChange.apply);
        }