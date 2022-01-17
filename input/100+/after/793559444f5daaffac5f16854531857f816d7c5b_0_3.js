function()
{
	var ispName = '';
	var uMarker = null;
	var aMarker = null;
	var markers = [];
	var searchCircle;
	var searchArea = 1; // 1 mile
	var mapMoveTimeout;
		
// create the map & info window //
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : 14,
		disableDefaultUI : mobile,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});
	var win = new InfoBox({
		content: document.getElementById('map_window'),
		disableAutoPan: false,
		maxWidth: 0,
		zIndex: null,
		closeBoxMargin: "10px",
		closeBoxURL: '',
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: true,
		pane: "floatPane",
		boxClass : 'map_window_solid',
		enableEventPropagation: false
	});
	var searchCircle = new google.maps.Circle({
		map: map,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.25,
		radius: GoogleMap.calcMilesToMeters(searchArea / 2)
	});
	google.maps.event.addListener(map, 'click', function(e) { win.hide(); });
	google.maps.event.addListener(searchCircle, 'click', function(e) { win.hide(); });

// create colored markers & a shadow //
	var drawMarker = function(color)
	{
		return new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34)
		);
	}
	var drawMarkerShadow = function(){
		return new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		new google.maps.Size(40, 37),
			new google.maps.Point(0, 0),
			new google.maps.Point(12, 35)
		);
	}
	var markerRed = drawMarker('B03120');
	var markerGreen = drawMarker('24B020');
	var markerShadow = drawMarkerShadow();

// public methods //
	
	this.showIsp = function(isp)
	{
		ispName = isp;
		drawMap(); win.hide();
	}

	this.setLocation = function(obj)
	{
		if (uMarker == null) {
			map.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
		}	else{
			uMarker.setPosition(new google.maps.LatLng(obj.lat, obj.lng));
	//  redrawing on watchLocation change is cpu intesive //
	//  disabled unless we want to track the user's position across cities
	//  in which case, call on an interval and only if change value is significant 
		// drawMap();
	//  manually reset window position to get around bug on mobile safari //
			win.setPosition(aMarker.getPosition());
		}
		searchCircle.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
	}

	this.setUserIspAndStatus = function(isp, status)
	{
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		drawMap();
	}

	this.getMarkers = function()
	{
		var bnds = map.getBounds();
		var ne = bnds.getNorthEast();
		var sw = bnds.getSouthWest();
		(function( ne, sw){
		// first clear all markers from the map //
			while(markers.length){ markers[0].setMap(null); markers.splice(0, 1); }
			$.ajax({
				url: '/get-markers',
				type : "POST",
				data : {ne : ne, sw : sw},
				success: function(markers){ addMarkers(markers); },
				error: function(jqXHR){ console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText); }
			});
		})({ lat:ne.lat(), lng:ne.lng() }, { lat:sw.lat(), lng:sw.lng() });
	}
	
	var addMarkers = function(a)
	{
		for (var i = a.length - 1; i >= 0; i--) {
	// build the markers and add them to the markers array //
			if (a[i].user == false) {
				addMarker(a[i]);
			}	else{
				uMarker = drawGeoMarker(a[i]);
			}
		}
		drawMap();
	}
	
	var drawMap = function()
	{
		for (var i = markers.length - 1; i >= 0; i--) {
			markers[i].setVisible(markers[i].isp == ispName);
			markers[i].inCircle = searchCircle.contains(markers[i].getPosition());
		}
		tintSearchCircle();
	}
	
	var tintSearchCircle = function()
	{
		var a = [];
		for (var i = markers.length - 1; i >= 0; i--) if (markers[i].inCircle && markers[i].isp == ispName) a.push(parseInt(markers[i].status));
		var n = 0;
		for (var i = a.length - 1; i >= 0; i--) n += a[i];
		n /= a.length;
		var c = 'green';
		if (n < .3){
			var c = 'red';
		}	else if (n >= .3 && n <= .7){
			var c = 'yellow';
		}
		searchCircle.setOptions({ fillColor:c, strokeColor:c });
	}

	var addMarker = function(obj)
	{
		var m = new google.maps.Marker({
			map : map,
			isp : obj.isp,
			status : obj.status,
			time : obj.time,
			inCircle : obj.inCircle,
			icon : obj.status == 1 ? markerGreen : markerRed,
			shadow : markerShadow,
			position : new google.maps.LatLng(obj.lat, obj.lng)
		});
		markers.push(m);
		addMarkerClickHandler(m);
		return m;
	}

	var drawGeoMarker = function(obj)
	{
		var i = new google.maps.MarkerImage('img/markers/bluedot.png',
			null, // size
			null, // origin
			new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
			new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
		);
		var m = new google.maps.Marker({
			map: map,
			isp : obj.isp,
			status : obj.status,
			time : obj.time,
			inCircle : true,
			flat: true,
			icon: i,
			visible: true,
			optimized: false,
			title : 'geoMarker',
			position : new google.maps.LatLng(obj.lat, obj.lng)
		});
		markers.push(m);
		addMarkerClickHandler(m);
		return m;
	}

	var addMarkerClickHandler = function(m)
	{
		google.maps.event.addListener(m, 'click', function(){
			aMarker = m;
			var offset = new google.maps.Size(-93, m.title == 'geoMarker' ? -90 : -110);
			var status = "<span style='color:"+(m.status==1 ? 'green' : 'red')+"'>"+(m.status==1 ? 'Status Online' : 'Status Offline')+"</span>";
			$('#map_window #isp').html(m.isp + ' : '+status);
			$('#map_window #time').html('Updated : ' + moment(parseInt(m.time)).fromNow());
			win.setOptions({ pixelOffset : offset });
		//	win.setOptions({ boxClass : (m.special ? 'map_window_gradient': 'map_window_solid') });
			$('#map_window').show(); win.open(map, m); win.show();
		});
	}

	// var drawPoints = function(lat, lng)
	// {
	// 	addMarker(lat + GoogleMap.calcMilesToLatDegrees(searchArea/2), lng);
	// 	addMarker(lat - GoogleMap.calcMilesToLatDegrees(searchArea/2), lng);
	// 	addMarker(lat, lng - GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
	// 	addMarker(lat, lng + GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
	// }

	var drawBounds = function(lat, lng)
	{
		var sw = new google.maps.LatLng(lat - GoogleMap.calcMilesToLatDegrees(searchArea/2), lng - GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
		var ne = new google.maps.LatLng(lat + GoogleMap.calcMilesToLatDegrees(searchArea/2), lng + GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
		var rect = new google.maps.Rectangle({
			map: map,
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			bounds: new google.maps.LatLngBounds(sw, ne)
		});
	}

	google.maps.Circle.prototype.contains = function(latLng) {
		return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
	}

}