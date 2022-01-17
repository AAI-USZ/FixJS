function ( data ) {
		var lonLat = $.parseJSON(data);
		var bk = this.getSelectedBuildingKey();
		this.coordsCache[bk] = lonLat;
		this.centerMapData(this.coordsCache[bk]);
	}