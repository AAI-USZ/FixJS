function()
	{
		var a = [];
		for (var i = markers.length - 1; i >= 0; i--) if (markers[i].inCircle && markers[i].isp == ispName) a.push(parseInt(markers[i].status));
		var n = 0;
		for (var i = a.length - 1; i >= 0; i--) n += a[i];
		if (uMarker.isp != ispName){
			n /= a.length;
		}	else{
			n += uMarker.status;
			n /= a.length + 1;
		}
		var c = 'green';
		if (n < .3){
			var c = 'red';
		}	else if (n >= .3 && n <= .7){
			var c = 'yellow';
		}
		searchCircle.setOptions({ fillColor:c, strokeColor:c });
	}