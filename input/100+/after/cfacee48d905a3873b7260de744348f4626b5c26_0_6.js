function()
{
	var ispName = '';
	var uMarker = null;
	var markers = [];
	var searchCircle;
	var searchArea = 1; // 1 mile
	var mapMoveTimeout;
		
// create the map & info window //
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : 14,
		disableDefaultUI : true,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});
	var win = new InfoBox({
		content: document.getElementById('map_window'),
		disableAutoPan: false,
		maxWidth: 0,
		pixelOffset: new google.maps.Size(-94, -110),
		zIndex: null,
		closeBoxMargin: "10px",
		closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
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
	
	this.setMenuIsp = function(isp)
	{
		ispName = isp;
		drawMap();
	}

	this.setLocation = function(obj)
	{
		if (uMarker) {
			uMarker.setPosition(new google.maps.LatLng(obj.lat, obj.lng));
			drawMap();
		}
		map.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
		searchCircle.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
	}

	this.setUserIspAndStatus = function(isp, status)
	{
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		uMarker.setIcon(status == 1 ? markerGreen : markerRed);
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
			var m = addMarker(a[i]);
			if (a[i].user == true) uMarker = m;
		}
		drawMap();
	}
	
	var drawMap = function()
	{
		for (var i = markers.length - 1; i >= 0; i--) {
			markers[i].setVisible(markers[i].isp == ispName);
			markers[i].inCircle = searchCircle.contains(markers[i].getPosition());
		}
		win.hide(); drawSearchArea();
	}
	
	var drawSearchArea = function()
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
			// animation : google.maps.Animation.DROP,
			// icon : './img/markers/'+icons.fail[i]+'.png',
			position : new google.maps.LatLng(obj.lat, obj.lng)
		});
		markers.push(m);
		google.maps.event.addListener(m, 'click', function(){
			var status = "<span style='color:"+(m.status==1 ? 'green' : 'red')+"'>"+(m.status==1 ? 'Status Online' : 'Status Offline')+"</span>";
			$('#map_window #isp').html(m.isp + ' : '+status);
			$('#map_window #time').html('Last Updated : ' + moment(parseInt(m.time)).fromNow());
		//	win.setOptions({ boxClass : (m.special ? 'map_window_gradient': 'map_window_solid') });
			$('#map_window').show(); win.open(map, m); win.show();
		});
		return m;
	}

	var drawPoints = function(lat, lng)
	{
		addMarker(lat + GoogleMap.calcMilesToLatDegrees(searchArea/2), lng);
		addMarker(lat - GoogleMap.calcMilesToLatDegrees(searchArea/2), lng);
		addMarker(lat, lng - GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
		addMarker(lat, lng + GoogleMap.calcMilesToLngDegrees(lat, searchArea/2));
	}

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