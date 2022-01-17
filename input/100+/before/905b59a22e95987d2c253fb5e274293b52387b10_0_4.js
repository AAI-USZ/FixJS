function (options) {

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            'mapCenterLng': 37.914868851081415,
            'mapCenterLat': -122.0017056045532,
            'mapZoom': 10,
            'testMode': true,
			'filterButtons': [{ Title: "Green Business", Type: "Green Business", Icon: "ui-icon-locked" },
				{ Title: "Free Consulting", Type: "Free Consulting", Icon: "ui-icon-alert" },
				{ Title: "Financing", Type: "Financing", Icon: "ui-icon-circle-triangle-e" }]
        }, options);

		
        var overlay, cartodb_imagemaptype, userMarker
        alertContainer = null,
        mapContainer = null,
        resultContainer = null,
        buttonListContainer = null,
        carto_map = null,
        resultsDataList = null,
        markerImage = null,
		cartodb_layer = null;

		//creating the user click marker -if already created reset the position
        var new_marker = function (latLng) {
            if (userMarker) {
                userMarker.setPosition(latLng);
            } else {
                userMarker = new google.maps.Marker({
                    position: latLng,
                    map: carto_map,
                    title: "Your Location",
                    icon: markerImage
                });
            }
            getListData();
        }

		//geolocaiton of user if able
        var getUserLocation = function () {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(getUserLocation_onPositionUpdate);
            else
                alertContainer.html("navigator.geolocation is not available");
        }
		
		//geolocation of user set the position on the map.
		//if user is out of the bounds then do not set and give message
        var getUserLocation_onPositionUpdate = function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var markerPoint = new google.maps.LatLng(lat, lng);


            var boundsLatLng = carto_map.getBounds();
            if (boundsLatLng.contains(markerPoint)) {
                new_marker(markerPoint);
            } else {
                alertContainer.html("Your location is outside of the visible area");
            }
        }

		//create the category button list
        var createButtonList = function () {
            //if geolocation is available add the button
            if (navigator.geolocation)
                $("<input type='button' value='get your location' />").appendTo(buttonListContainer).click(getUserLocation);
            
            //option buttons
			var filterButtons = settings['filterButtons'];
            for (buttonItem in filterButtons) {
                buttonListContainer.append('<input type="checkbox" id="check' + buttonItem + '" primaryicon="' + filterButtons[buttonItem]["Icon"] + '" filtertype="' + filterButtons[buttonItem]["Type"] + '" filtername="' + filterButtons[buttonItem]["Title"] + '" /><label for="check' + buttonItem + '">' + filterButtons[buttonItem]["Title"] + '</label>');
            }

            $(function () {
                $("input", buttonListContainer).each(function (index) {
                    $(this).button({
                        icons: {
                            primary: $(this).attr("primaryicon")
                        }
                    }).click(function () {
                        loadResultsDataList();
                    });
                });
            });
        }

		//load resource dataset based on buttons selected
		//creates two columns with grouped items and attemts to keep columns equal
        var loadResultsDataList = function (data) {
            var buttonSelectedList = $("input:checkbox:checked", buttonListContainer);

            if (buttonSelectedList.length == 0)
                buttonSelectedList = $("input:checkbox", buttonListContainer);

            resultContainer.empty().hide();

            if (resultsDataList && resultsDataList.rows && resultsDataList.rows.length > 0) {
				var totalHeight = 0;
				var headingContainerArr = new Array();
                buttonSelectedList.each(function () {
                    var filtertype = $(this).attr("filtertype");
                    var filtername = $(this).attr("filtername");
                    var headingContainer = null;
					var groupHeight = 1;
                    $.each(resultsDataList.rows, function (key, val) {
                        if (filtertype == val["type"]) {
                            if (!headingContainer) {
                                headingContainer = $("<div class='resourceGroup'></div>");
                                headingContainer.append("<h2>" + filtername + "</h2>");
                            }
							groupHeight += 1;
                            var resourceItem = $("<div class='resourceItem'><h3>" + val["name"] + "</h3><a href='" + cleanURLLink(val["url"]) + "'>" + cleanURLView(val["url"]) + "</a></div>").appendTo(headingContainer);
							resourceItem.children("a").click(function(){recordOutboundLink(this,'Resource',val["type"] + " - " + val["name"]); return false;});
						}
                    })
					
					if(headingContainer != null)
					{
						totalHeight += groupHeight;
						headingContainerArr.push([headingContainer, groupHeight]);
					}
                })
				
    			var rowOne = $("<div class='resourceColumns'></div>").appendTo(resultContainer);
    			var rowTwo = $("<div class='resourceColumns'></div>").appendTo(resultContainer);
				
				var rowCount = 0;
				var rowCountBottom = 0;
				var rowCountTop = 0;
				
				//find the center
				for (i=0; i<headingContainerArr.length; i++)
				{
					rowCountBottom += headingContainerArr[i][1];
					rowCountTop += headingContainerArr[headingContainerArr.length - i - 1][1];
					if(rowCountBottom >= (totalHeight/2)){
						rowCount = i
						break;
					}else if(rowCountTop >= (totalHeight/2)){
						rowCount = headingContainerArr.length - i - 1
						break;
					}
				}
				
				//put items into each column
				for (j=0; j<headingContainerArr.length; j++)
				{
					if(rowCount > j)
					{
    					headingContainerArr[j][0].appendTo(rowOne);
					} else {
    					headingContainerArr[j][0].appendTo(rowTwo);
					}
				}
				
                resultContainer.slideDown("800");
            }
            else {
                resultContainer.html("No data found");
                resultContainer.slideDown("400");
            }

        }

		//request resources based on the user selected point
        var getListData = function () {
            if (userMarker) {
                resultContainer.html("Loading...");

                var lat = userMarker.position.lat();
                var lng = userMarker.position.lng();
				var mapUrl = "http://cocobusinessresources.cartodb.com/api/v2/sql/?q=SELECT name, type, url, county FROM resources_041912_pro WHERE " +
						"ST_Intersects( the_geom, ST_SetSRID(ST_Point(" + lng + "," + lat + "), 4326))";
				if ($.browser.msie && window.XDomainRequest) {
					// Use Microsoft XDR
					var xdr = new XDomainRequest();
					xdr.open("get", mapUrl);
					xdr.onload = function() {
						// XDomainRequest doesn't provide responseXml, so if you need it:
						json = 'json = '+xdr.responseText; // the string now looks like..  json = { ... };
	  					eval(json); // json is now a regular JSON object
						resultsDataList = json;
						loadResultsDataList();
					};
					xdr.send();
				} else {
					$.ajax({
						url: mapUrl,
						dataType: 'json',
						success: function (data) {
							resultsDataList = data;
							loadResultsDataList();
						},
						error: function (data) {
							alert(data.statusText);
						}
					});
				}
            }
            else {
                alertContainer.html("Please select location on map");
            }
        }

		//attempt to track user click to resource
		var recordOutboundLink = function(link, category, action) {
			if(typeof _gat != 'undefined')
			{
				_gat._getTrackerByName()._trackEvent(category, action);
			}
			window.open(link.href,"_blank");
		}
		
		//clean the urls from database - remove http:// from view
		var cleanURLView = function(url) {
			return url.replace(/.*?:\/\//g, "");
		}
		
		//clean the urls from database - add http:// for click
		var cleanURLLink = function(url) {
			if(url.substring(0, 4) != "http"){
				return "http://" + url;
			} else {
				return url;
			}
		}
		
		//*************
		//set up the control
		//**************
		
		this.append("<div id='map'></div><div id='data'><div id='alerts'></div><div id='buttonList'></div><div id='results'></div></div>");
		mapContainer = $("#map", this);
		alertContainer = $("#data #alerts", this);
		resultContainer = $("#data #results", this);
		buttonListContainer = $("#data #buttonList", this);
		
		
		markerImage = new google.maps.MarkerImage('http://cartodb-gallery.appspot.com/static/icon.png');
		
		//map background layer
		cartodb_layer = {
			getTileUrl: function (coord, zoom) {
				return "https://cocobusinessresources.cartodb.com/tiles/resources_041912_pro/" + zoom + "/" + coord.x + "/" + coord.y + ".png" +
				"?sql=SELECT * FROM resources_041912_pro where objectid = 1";
			},
			tileSize: new google.maps.Size(256, 256)
		};
		
		//map options
		var cartodbMapOptions = {
			zoom: settings['mapZoom'],
			center: new google.maps.LatLng(settings['mapCenterLng'], settings['mapCenterLat']),
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	
		// Init the map
		carto_map = new google.maps.Map(mapContainer[0], cartodbMapOptions);
	
		map_style = [{ stylers: [{ saturation: -65 }, { gamma: 1.52 }] }, 
			{ featureType: "administrative", stylers: [{ saturation: -95 }, 
			{ gamma: 2.26 }] }, 
			{ featureType: "water", elementType: "labels", stylers: [{ visibility: "off" }] }, 
			{ featureType: "administrative.locality", stylers: [{ visibility: 'off' }] }, 
			{ featureType: "road", stylers: [{ visibility: "simplified" }, { saturation: -99 }, { gamma: 2.22 }] }, 
			{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }, 
			{ featureType: "road.arterial", stylers: [{ visibility: 'off' }] }, 
			{ featureType: "road.local", elementType: "labels", stylers: [{ visibility: 'off' }] }, 
			{ featureType: "transit", stylers: [{ visibility: 'off' }] }, 
			{ featureType: "road", elementType: "labels", stylers: [{ visibility: 'off' }] }, 
			{ featureType: "poi", stylers: [{ saturation: -55 }] }];
			
		carto_map.setOptions({ styles: map_style });
	
		google.maps.event.addListener(carto_map, 'click', function (event) {
			new_marker(event.latLng);
		});
	
		//testing and setup data
		if(settings['testMode']){
			google.maps.event.addListener(carto_map, "center_changed", function () {
				var centerLatLng = carto_map.center;
				var boundsLatLng = carto_map.getBounds();
				var zoom = carto_map.zoom;
				var boundsNorthEast = boundsLatLng.getNorthEast();
				var boundsSouthWest = boundsLatLng.getSouthWest();
		
				alertContainer.html('LAT: ' + centerLatLng.lat() + ', LNG ' + centerLatLng.lng() + ', ZOOM: ' + zoom +
					'<br />BOUNDS: SW LAT: ' + boundsSouthWest.lat() + ', LNG ' + boundsSouthWest.lng() + ' - NE LAT: ' + boundsNorthEast.lat() + ', LNG ' + boundsNorthEast.lng());
			});
		}
	
		// Add the cartodb tiles
		cartodb_imagemaptype = new google.maps.ImageMapType(cartodb_layer);
		carto_map.overlayMapTypes.insertAt(0, cartodb_imagemaptype);
	
		createButtonList();
        return this;
    }