function() {
		this.destroyMap();
		try {
			this.createMap();
		} catch (e) {
			this.doLoadFailure(e);
			return;
		}
		this.mapTypeChanged();
		this.updateCenter();
		this.zoomChanged();
		this.showPinChanged();
		this.doLoaded();
	}