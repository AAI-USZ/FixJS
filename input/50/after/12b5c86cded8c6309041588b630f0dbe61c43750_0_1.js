function() {
        this.removeAllPrimitives();
        this._scene.getPrimitives().remove(this._polylineCollection);
        return destroyObject(this);
    }