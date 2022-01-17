function () {
		// TODO refactor, this should happen automatically
		if (this.options.zoomControl) {
			this.zoomControl = new L.Control.Zoom();
			this.addControl(this.zoomControl);
		}
		if (this.options.attributionControl) {
			this.attributionControl = new L.Control.Attribution();
			this.addControl(this.attributionControl);
		}
	}