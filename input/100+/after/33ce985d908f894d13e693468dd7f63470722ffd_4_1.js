function(description) {
        if (typeof description.terrainProvider === 'undefined') {
            throw new DeveloperError('description.terrainProvider is required.');
        }
        if (typeof description.imageryLayerCollection === 'undefined') {
            throw new DeveloperError('description.imageryLayerCollection is required.');
        }

        this.terrainProvider = description.terrainProvider;
        this.imageryLayerCollection = description.imageryLayerCollection;
        this.maxScreenSpaceError = defaultValue(description.maxScreenSpaceError, 2);

        this._levelZeroTiles = undefined;
        this._renderList = [];
        this._tileLoadQueue = new TileLoadQueue();
        this._tileReplacementQueue = new TileReplacementQueue();
        this._tilingScheme = undefined;
        this._occluder = undefined;
        this._doLodUpdate = true;
        this._frozenLodCameraPosition = undefined;
        this._boundingSphereTile = undefined;
        this._boundingSphereVA = undefined;

        var that = this;
        when(this.terrainProvider.tilingScheme, function(tilingScheme) {
            that._tilingScheme = tilingScheme;
            that._levelZeroTiles = tilingScheme.createLevelZeroTiles();
            that._occluder = new Occluder(new BoundingSphere(Cartesian3.ZERO, that.terrainProvider.tilingScheme.ellipsoid.getMinimumRadius()), Cartesian3.ZERO);
        });
    }