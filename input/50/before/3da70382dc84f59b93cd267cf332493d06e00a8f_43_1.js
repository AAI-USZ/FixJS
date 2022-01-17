function(movement) {
        handleZoom(this, movement, this._ellipsoid.toCartographic3(this._camera.position).height);
    }