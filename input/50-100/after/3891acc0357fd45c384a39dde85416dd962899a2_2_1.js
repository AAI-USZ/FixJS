function()
	{
		styler = [{
				elementType: "labels",
				stylers: [{
					visibility: "off"
				}]
		}];
		
		options = {
			center: new google.maps.LatLng(0, 0),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			styles: styler
		};
		
		map = new google.maps.Map(document.getElementById("mapCanvas"),
			options);
	}