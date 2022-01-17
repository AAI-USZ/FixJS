function()
	{
		console.log('drawMap')
		console.log('**searchCircle = '+searchCircle);
		console.log('**markers.length = '+markers.length);
		for (var i = markers.length - 1; i >= 0; i--) {
			markers[i].setVisible(markers[i].isp == ispName);
			markers[i].inCircle = searchCircle.contains(markers[i].getPosition());
		}
		tintSearchCircle();
	}