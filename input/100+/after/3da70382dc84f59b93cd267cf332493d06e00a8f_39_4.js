function(sceneState) {
        var mode = sceneState.mode;
        var projection = sceneState.scene2D.projection;

        var billboards;
        var length;
        var i;
        var b;

        if ((this._mode !== mode) ||
            (this._projection !== projection) ||
            (mode !== SceneMode.SCENE3D) &&
            (!this._modelMatrix.equals(this.modelMatrix))) {

            this._mode = mode;
            this._projection = projection;
            this._modelMatrix = this.modelMatrix.clone();

            billboards = this._billboards;
            length = billboards.length;

            switch (mode) {
            case SceneMode.SCENE3D:
                for (i = 0; i < length; ++i) {
                    b = billboards[i];
                    b._setActualPosition(b.getPosition());
                }
                break;

            case SceneMode.SCENE2D:
                this._updateScene2D(projection, this._billboards);
                break;

            case SceneMode.COLUMBUS_VIEW:
                this._updateColumbusView(projection, this._billboards);
                break;
            }
        } else if (mode === SceneMode.MORPHING) {
            billboards = this._billboards;
            length = billboards.length;

            for (i = 0; i < length; ++i) {
                b = billboards[i];
                var p = b.getPosition();
                var projectedPoint = projection.project(projection.getEllipsoid().cartesianToCartographic(p));

                b._setActualPosition({
                    x : CesiumMath.lerp(projectedPoint.z, p.x, this.morphTime),
                    y : CesiumMath.lerp(projectedPoint.x, p.y, this.morphTime),
                    z : CesiumMath.lerp(projectedPoint.y, p.z, this.morphTime)
                });
            }
        } else if (mode === SceneMode.SCENE2D) {
            this._updateScene2D(projection, this._billboardsToUpdate);
        } else if (mode === SceneMode.COLUMBUS_VIEW) {
            this._updateColumbusView(projection, this._billboardsToUpdate);
        }
    }