function addToTilesToRender(layer, tile, context, sceneState) {
        if (layer._tilesToRender.indexOf(tile) !== -1) {
            return;
        }

        var mode = sceneState.mode;
        var projection = sceneState.scene2D.projection;

        // create vertex array the first time it is needed or when morphing
        if (!tile.vertexArray ||
            tile.vertexArray.isDestroyed() ||
            layer._centralBody._isModeTransition(layer._centralBody._mode, mode) ||
            tile._mode !== mode ||
            layer._centralBody._projection !== projection) {

            tile.vertexArray = tile.vertexArray && tile.vertexArray.destroy();

            if (mode === SceneMode.SCENE3D) {
                layer._centralBody._terrain.createTileEllipsoidGeometry(context, tile);
            } else {
                layer._centralBody._terrain.createTilePlaneGeometry(context, tile, projection);
            }

            // TODO: can we get rid of this?
            tile._mode = mode;
        }

        var tileImagery = getTileImagery(layer, tile);
        if (typeof tileImagery._drawUniforms === 'undefined') {
            var intensity = 0.0;
            if (typeof layer._tileProvider.getIntensity === 'function') {
                intensity = layer._tileProvider.getIntensity(tile);
            }

            var drawUniforms = {
                u_dayTexture : function() {
                    return tileImagery._texture;
                },
                u_dayIntensity : function() {
                    return intensity;
                },
                u_center3D : function() {
                    return tile.get3DBoundingSphere().center;
                },
                u_center2D : function() {
                    return tile.get2DBoundingSphere(projection).center;
                },
                u_modifiedModelView : function() {
                    return tile.modelView;
                }
            };

            tileImagery._drawUniforms = combine(drawUniforms, layer._centralBody._drawUniforms);
        }

        layer._tilesToRender.push(tile);
    }