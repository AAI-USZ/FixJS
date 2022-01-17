function(context, centralBodyUniformMap, drawArguments) {
        var renderList = this._renderList;
        if (renderList.length === 0) {
            return;
        }

        var uniformState = context.getUniformState();
        var mv = uniformState.getModelView();

        context.beginDraw(drawArguments);

        var uniformMap = combine(uniformMapTemplate, centralBodyUniformMap);

        for (var i = 0, len = renderList.length; i < len; i++) {
            var tile = renderList[i];

            var rtc = tile.get3DBoundingSphere().center;
            uniformMap.center3D = rtc;

            var centerEye = mv.multiplyByVector(new Cartesian4(rtc.x, rtc.y, rtc.z, 1.0));
            // PERFORMANCE_TODO: use a scratch matrix instead of cloning for every tile.
            var mvrtc = mv.clone();
            mvrtc.setColumn3(centerEye);
            uniformMap.modifiedModelView = mvrtc;

            var imageryCollection = tile.imagery;

            // TODO: clear out uniformMap.dayTextures?

            var numberOfDayTextures = 0;
            for (var imageryIndex = 0, imageryLen = imageryCollection.length; imageryIndex < imageryLen; ++imageryIndex) {
                var imagery = imageryCollection[imageryIndex];
                if (!imagery || imagery.state !== TileState.READY) {
                    continue;
                }

                uniformMap.dayTextures[numberOfDayTextures] = imagery.texture;
                uniformMap.dayTextureTranslation[numberOfDayTextures] = imagery.textureTranslation;
                uniformMap.dayTextureScale[numberOfDayTextures] = imagery.textureScale;

                ++numberOfDayTextures;
            }

            if (typeof tile.parent !== 'undefined' &&
                tile.parent.cameraInsideBoundingSphere) {
                uniformMap.cameraInsideBoundingSphere = true;
            } else {
                uniformMap.cameraInsideBoundingSphere = false;
            }

            uniformMap.numberOfDayTextures = numberOfDayTextures;

            context.continueDraw({
                primitiveType : TerrainProvider.wireframe ? PrimitiveType.LINES : PrimitiveType.TRIANGLES,
                vertexArray : tile.vertexArray,
                uniformMap : uniformMap
            });
        }

        if (this._boundingSphereTile) {
            if (!this._boundingSphereVA) {
                var radius = this._boundingSphereTile.get3DBoundingSphere().radius;
                var sphere = CubeMapEllipsoidTessellator.compute(new Ellipsoid({x:radius, y:radius, z:radius}), 10);
                MeshFilters.toWireframeInPlace(sphere);
                this._boundingSphereVA = context.createVertexArrayFromMesh({
                    mesh : sphere,
                    attributeIndices : MeshFilters.createAttributeIndices(sphere)
                });
            }

            var rtc2 = this._boundingSphereTile.get3DBoundingSphere().center;
            uniformMap.center3D = rtc2;

            var centerEye2 = mv.multiplyByVector(new Cartesian4(rtc2.x, rtc2.y, rtc2.z, 1.0));
            // PERFORMANCE_TODO: use a scratch matrix instead of cloning for every tile.
            var mvrtc2 = mv.clone();
            mvrtc2.setColumn3(centerEye2);
            uniformMap.modifiedModelView = mvrtc2;

            context.continueDraw({
                primitiveType : PrimitiveType.LINES,
                vertexArray : this._boundingSphereVA,
                uniformMap : uniformMap
            });

        }

        context.endDraw();
    }