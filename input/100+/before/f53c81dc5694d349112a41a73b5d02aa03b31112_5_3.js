function (marker) {
            var opts = this.data('gmap').opts;

            if (opts.log) {console.log("putting marker at " + marker.latitude + ', ' + marker.longitude + " with address " + marker.address + " and html "  + marker.html); }

            // Create new icon
            // Set icon properties from global options
            var _gicon = {
                image: opts.icon.image,
                iconSize: new $googlemaps.Size(opts.icon.iconsize[0], opts.icon.iconsize[1]),
                iconAnchor: new $googlemaps.Point(opts.icon.iconanchor[0], opts.icon.iconanchor[1]),
                infoWindowAnchor: new $googlemaps.Size(opts.icon.infowindowanchor[0], opts.icon.infowindowanchor[1])
            },
            _gshadow = {
                image: opts.icon.shadow,
                iconSize: new $googlemaps.Size(opts.icon.shadowsize[0], opts.icon.shadowsize[1]),
                anchor: _gicon.iconAnchor
            };

            // not very nice, but useful
            marker.infoWindowAnchor = _gicon.infoWindowAnchor;

            if (marker.icon) {
                // Overwrite global options
                if (marker.icon.image) { _gicon.image = marker.icon.image; }
                if (marker.icon.iconsize) { _gicon.iconSize = new $googlemaps.Size(marker.icon.iconsize[0], marker.icon.iconsize[1]); }

                if (marker.icon.iconanchor) { _gicon.iconAnchor = new $googlemaps.Point(marker.icon.iconanchor[0], marker.icon.iconanchor[1]); }
                if (marker.icon.infowindowanchor) { _gicon.infoWindowAnchor = new $googlemaps.Size(marker.icon.infowindowanchor[0], marker.icon.infowindowanchor[1]); }

                if (marker.icon.shadow) { _gshadow.image = marker.icon.shadow; }
                if (marker.icon.shadowsize) { _gshadow.iconSize = new $googlemaps.Size(marker.icon.shadowsize[0], marker.icon.shadowsize[1]); }
            }

            var gicon = new $googlemaps.MarkerImage(_gicon.image, _gicon.iconSize, null, _gicon.iconAnchor);
            var gshadow = new $googlemaps.MarkerImage( _gshadow.image,_gshadow.iconSize, null, _gshadow.anchor);

            // Check if address is available
            if (marker.address) {
                // Check for reference to the marker's address
                if (marker.html === '_address') {
                    marker.html = marker.address;
                }

                if (marker.title == '_address') {
                    marker.title = marker.address;
                }

                if (opts.log) {console.log('geocoding marker: ' + marker.address); }
                // Get the point for given address
                methods._geocodeMarker.apply(this, [marker, gicon, gshadow]);
            } else {
                // Check for reference to the marker's latitude/longitude
                if (marker.html === '_latlng') {
                    marker.html = marker.latitude + ', ' + marker.longitude;
                }

                if (marker.title == '_latlng') {
                    marker.title = marker.latitude + ', ' + marker.longitude;
                }

               // Create marker
                var gpoint = new $googlemaps.LatLng(marker.latitude, marker.longitude);
                methods.processMarker.apply(this, [marker, gicon, gshadow, gpoint]);
            }
            return this;
        }