function(detail, obj) {
			var data = detail.data;
			for (var i = 0; i < data.length; ++i) {

				var point = data[i];
				var ll = new google.maps.LatLng(point.lat, point.lon);

				if (obj.last_point === null)
				{

					// var pinColor = "FFFFFF";
	  		// 		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			  //       new google.maps.Size(21, 34),
			  //       new google.maps.Point(0,0),
			  //       new google.maps.Point(10, 34));
					// Create begin
					obj.marker = new google.maps.Marker({
						position:ll,
						// icon: pinImage,
						map: obj.map,
						title: "begin"});
				}
				else
				{
					var distance = obj.distance(obj.last_point.lat(), obj.last_point.lng(),
							 ll.lat(), ll.lng());
					var diff_t = point.time_t - obj.last_time;
					var speed = distance/diff_t * 3600.0;

					// TODO véritable gestion des couleurs, avec légende
					var color = (280.0-speed * 20.0) % 360.0;
					if (color < 0.0) color += 360.0;
					var lum = 50;
					if (speed < 2.0) lum = 20;
					else if (speed > 20) lum = 80;
					// console.log(speed * 3.6);
					// console.log(color);
					var line = new google.maps.Polyline({
						path: [obj.last_point, ll],
						strokeColor: "hsl("+color+", 50%, "+lum+"%)",
						strokeWeight: 3
					});
					line.setMap(obj.map);
					obj.marker.setPosition(ll);
				}
				if (!obj.map.getBounds().contains(ll))
					obj.map.setCenter(ll);
				obj.last_point = ll;
				obj.last_time = point.time_t;
			}
		}