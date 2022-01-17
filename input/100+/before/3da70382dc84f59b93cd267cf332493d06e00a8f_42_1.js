function(template) {
        var t = template || {};
        var ellipsoid = t.ellipsoid || Ellipsoid.WGS84;
        var destination = t.destination || Ellipsoid.WGS84.cartographicDegreesToCartesian(new Cartographic3(0.0, 0.0, 0.0));
        var duration = t.duration || 4.0;
        var complete = template.complete;
		var flightController = new CameraFlightController(this._canvas, this._camera, ellipsoid, destination, duration, complete);
		this._controllers.push(flightController);
		return flightController;
    }