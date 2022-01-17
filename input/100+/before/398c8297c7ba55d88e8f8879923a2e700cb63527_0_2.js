function () {
            $.smoothScroll ({
                scrollElement: $('#bg2'),
                scrollTarget: $('#gMapGridBox'),
                offset: -85
            });
            ele = ele || '#gMapContainer';
            var $mc = $(ele);
            var latlng = new google.maps.LatLng(parseFloat ($('#SiteLatDec').val()) || 58, parseFloat ($('#SiteLonDec').val()) || 9.5);

            myOptions = {
                zoom: 3,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var ni = $('.mapContainer').length + 1;
            var mcid = 'mapContainer_' + (ni);
            $mc.attr ('id', mcid).addClass ('mapContainer');
            
            var gmap = new google.maps.Map(document.getElementById (mcid), myOptions);
            
            var marker = new google.maps.Marker({
                position: latlng, 
                map: gmap,
                draggable: true,
                title:"Site Location",
                animation: google.maps.Animation.DROP
            });
            
            var infoWindow = new google.maps.InfoWindow ({
                maxWidth: 250, // iPhone
            });
              
            wc.local.map = {
                mapContainer: $mc,
                map: gmap,
                marker: marker,
                info: infoWindow,
                showPlace: function (place) {
                    //console.log ("showPlace", this, place);
                    var latlng = new google.maps.LatLng(parseFloat (place.lat) || 0, parseFloat (place.lng) || 0);
                    var iwi = "rgsMapInfoBox-"+place.placeIndex;
                    
                    this.info.setPosition (latlng);
                    this.info.setContent ('<div id="'+iwi+'" style="height: 4.7em; width: 250px; overflow: hidden;">Loading...</div>');
                    
                    google.maps.event.addListener (this.info, 'domready', function () {
                        ($('#'+iwi).text('')
                            .append ($('#rgsUseButton-'+place.placeIndex).clone(true)))
                            .append ($('<span class="placeTitle" style="margin-left: 3px;">'+place.placeTitle+'</span>'))
                            .append ($('<div class="help"><span class="geo"><span class="latitude">'+place.hrLat+'</span> <span class="longitude">'+place.hrLng+'</span></span> <span class="elevation">'+place.elevation+'</span><div>'));
                    });
                    google.maps.event.addListener (this.info, 'closeclick', function () {
                        wc.local.map.map.panTo (wc.local.map.marker.getPosition());
                    });
                    
                    this.info.open (this.map);
                    
                    return true;
                },
                fromBoxen: function () { // when user types in l/l boxen or lookup's Use button clicked
                    var latlng = new google.maps.LatLng(parseFloat ($('#SiteLatDec').val()) || 0, parseFloat ($('#SiteLonDec').val()) || 0);
                    wc.local.map.marker.setPosition (latlng);
                    wc.local.map.map.panTo (latlng);
                    wc.demLookup();
                },
            };
            
            $('#SiteLatDec, #SiteLonDec').keyup (function () {
                wc.local.map.fromBoxen();
            });
            
            if (typeof wc.local.mapqueue == 'function') {
                wc.local.mapqueue ();
                wc.local.mapqueue = null;
            }
            
            var udm = function (event) {
                marker.setPosition (event.latLng);
                $('#SiteLatDec').val(event.latLng.lat())
                $('#SiteLonDec').val(event.latLng.lng())
                gmap.panTo (marker.getPosition());
                console.log ("UDM",event);
            };
            var udmnm = function (event) {
                marker.setPosition (event.latLng);
                $('#SiteLatDec').val(event.latLng.lat())
                $('#SiteLonDec').val(event.latLng.lng())
            };
            var drop = function (event) {
                udm (event);
                /*var z = gmap.getZoom ();
                if (z < 16) {
                    z = Math.ceil (z * 1.15);
                    gmap.setZoom (z);
                }// don't do the above actually because it conflicts with the default zoom on double click behaviour which won't go away as easily as it might */
                wc.demLookup();
            };
            var dblclick = function (event) {
                udmnm (event);
                wc.demLookup()
            };

            google.maps.event.addListener (marker, 'dragend', drop);
            google.maps.event.addListener (gmap, 'dblclick', dblclick);
            //google.maps.event.addListener (gmap, 'click', function () { return false; });
            
            google.maps.event.addListener (gmap, 'resize', function () {
                gmap.setCenter (marker.getPosition());
            });

            var mapResizeHandler = function (i, width) {
                setTimeout ("google.maps.event.trigger(wc.local.map.map, 'resize');", 150);
            };
            $('body').data ('resizeHandler', mapResizeHandler);
            
            $mc.resize (mapResizeHandler);
            
            wc.local.map.elevator = new google.maps.ElevationService();
            
        }