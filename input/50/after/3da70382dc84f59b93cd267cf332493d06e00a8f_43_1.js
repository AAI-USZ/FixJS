function(movement) {
        handleZoom(this, movement, this._ellipsoid.cartesianToCartographic(this._camera.position).height);
    }