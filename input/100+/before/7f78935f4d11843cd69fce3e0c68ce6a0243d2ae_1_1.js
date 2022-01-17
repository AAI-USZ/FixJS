function(context, sceneState) {
        if (!this._sp) {
            this._sp = context.getShaderCache().getShaderProgram(PolylineVS, PolylineFS, attributeIndices);
        }
        this._removePolylines();
        this._updateMode(sceneState);
        var properties = this._propertiesChanged;
        if (this._createVertexArray ||
                this._computeNewBuffersUsage() ||
                properties[WIDTH_INDEX] ||
                properties[OUTLINE_WIDTH_INDEX]) {
            this._createVertexArray = false;
            this._createVertexArrays(context);
        } else if (this._polylinesUpdated) {
            // Polylines were modified, but no polylines were added or removed.
            var polylinesToUpdate = this._polylinesToUpdate;
            var createVertex = false;
            if(this._mode !== SceneMode.SCENE3D){
                var updateLength = polylinesToUpdate.length;
                for(var i = 0; i < updateLength; ++i){
                    var polyline = polylinesToUpdate[i];
                    if(polyline._getChangedProperties()[POSITION_INDEX]){
                        var bucket = polyline._bucket;
                        if(bucket.getLengthOfPositionsInBucket() !== bucket.lengthOfPositions){
                            createVertex = true;
                            break;
                        }
                    }
                }
            }
            //if a polyline's size changes, we need to recompute the indicesBuffer
            if (properties[POSITION_SIZE_INDEX] || createVertex) {
                this._createVertexArrays(context);
            } else {
                var length = polylinesToUpdate.length;
                var polylineBuckets = this._polylineBuckets;
                for ( var i = 0; i < length; ++i) {
                    var polyline = polylinesToUpdate[i];
                    properties = polyline._getChangedProperties();
                    var bucket = polyline._bucket;
                    var positionIndex = 0;
                    for ( var x in polylineBuckets) {
                        if(polylineBuckets.hasOwnProperty(x)){
                            if (polylineBuckets[x] === bucket){
                                if (properties[POSITION_INDEX]) {
                                    bucket.writePositionsUpdate(positionIndex, polyline, this._positionBuffer);
                                }
                                if (properties[COLOR_INDEX]) {
                                    bucket.writeColorUpdate(positionIndex, polyline, this._colorBuffer);
                                }
                                if (properties[OUTLINE_COLOR_INDEX]) {
                                    bucket.writeColorUpdate(positionIndex, polyline, this._outlineColorBuffer);
                                }
                                if (properties[SHOW_INDEX]) {
                                    bucket.writeShowUpdate(positionIndex, polyline, this._showBuffer);
                                }
                                break;
                            }
                            positionIndex += polylineBuckets[x].lengthOfPositions;
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