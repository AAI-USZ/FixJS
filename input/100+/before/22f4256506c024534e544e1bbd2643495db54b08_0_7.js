function(pnl, tab)
	{
		
		this.groupField = "DeviceID";
		this.grps = {};
		this.minT = Number.MAX_VALUE;
		this.maxT = -Number.MAX_VALUE;
		this.tPanel;
		this.mkrs = ["redCircle", "greenCircle", "greyCircle", "yellowCircle", "whiteCircle","plumCircle", "darkGreyCircle","maroonCircle", "navyCircle", "mintCircle",  "pinkCircle", "purpleCircle",
							   "redSquare", "greenSquare", "greySquare", "plumSquare", "darkGreySquare","maroonSquare", "navySquare", "mintSquare",  "pinkSquare", "purpleSquare"];
		this.currentMkr = -1;
		
		if(!tab.get('mapPnl')) return;
		
		Ext.get("ecMap").dom.style.display = "";
		Ext.get("ecMap").dom.style.width = tab.get('mapPnl').getWidth() + "px";
		Ext.get("ecMap").dom.style.height = (tab.get('mapPnl').getHeight() - 25) + "px";
		map = new google.maps.Map(document.getElementById('ecMap'), {
			center : new google.maps.LatLng(0,0),
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom : 2,
			panControl: true,
			rotateControl: true,
			zoomControl: true
		});
		//map.setCenterAndZoom(new mxn.LatLonPoint(0,0), 2);
		//map.setMapType(mxn.Mapstraction.HYBRID);
		
		
		/*map.maps['googlev3'].setOptions({
			panControl: true,
			rotateControl: true,
			zoomControl: true
		});*/
		
		this.drawPoints();
	}