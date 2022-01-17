function(context, sceneState) {
        if (!this._sp) {
            this._sp = context.getShaderCache().getShaderProgram(PolylineVS, PolylineFS, attributeIndices);
        }
        this._removePolylines();
        this._updateMode(sceneState);
        var bucket;
        var polyline;
        var properties = this._propertiesChanged;
        if (this._createVertexArray || this._computeNewBuffersUsage()) {
            this._createVertexArrays(context);
        } else if (this._polylinesUpdated) {
            // Polylines were modified, but no polylines were added or removed.
            var polylinesToUpdate = this._polylinesToUpdate;
            var createVertexArrays = false;
            if(this._mode !== SceneMode.SCENE3D){
                var updateLength = polylinesToUpdate.length;
                for(var i = 0; i < updateLength; ++i){
                    polyline = polylinesToUpdate[i];
                    var changedProperties = polyline._getChangedProperties();
                    if(changedProperties[POSITION_INDEX]){
                        bucket = polyline._bucket;
                        if(bucket.getLengthOfPositionsInBucket() !== bucket.lengthOfPositions){
                            createVertexArrays = true;
                            break;
                        }
                    }
                }
            }
            //if a polyline's positions size changes, we need to recreate the vertex arrays and vertex buffers because the indices will be different.
            if (properties[POSITION_SIZE_INDEX] ||
                    properties[WIDTH_INDEX] ||
                    properties[OUTLINE_WIDTH_INDEX] ||
                    createVertexArrays) {
                this._createVertexArrays(context);
            } else {
                var length = polylinesToUpdate.length;
                var polylineBuckets = this._polylineBuckets;
                for ( var ii = 0; ii < length; ++ii) {
                    polyline = polylinesToUpdate[ii];
                    properties = polyline._getChangedProperties();
                    bucket = polyline._bucket;
                    var index = 0;
                    for ( var x in polylineBuckets) {
                        if(polylineBuckets.hasOwnProperty(x)){
                            if (polylineBuckets[x] === bucket){
                                if (properties[POSITION_INDEX]) {
                                    bucket.writePositionsUpdate(index, polyline, this._positionBuffer);
                                }
                                if (properties[COLOR_INDEX]) {
                                    bucket.writeColorUpdate(index, polyline, this._colorBuffer);
                                }
                                if (properties[OUTLINE_COLOR_INDEX]) {
                                    bucket.writeColorUpdate(index, polyline, this._outlineColorBuffer);
                                }
                                if (properties[SHOW_INDEX]) {
                                    bucket.writeShowUpdate(index, polyline, this._showBuffer);
                                }
                                break;
                            }
                            index += polylineBuckets[x].lengthOfPositions;
                        }
                    }
                    polyline._clean();
                }
            }
            polylinesToUpdate.length = 0;
            this._polylinesUpdated = false;
        }
        for ( var k = 0; k < NUMBER_OF_PROPERTIES; ++k) {
            properties[k] = 0;
        }
    }