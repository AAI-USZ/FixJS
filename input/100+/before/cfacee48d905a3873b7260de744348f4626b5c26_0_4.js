function(obj)
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
	}