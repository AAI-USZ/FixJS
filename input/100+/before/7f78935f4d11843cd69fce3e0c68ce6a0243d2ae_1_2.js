function(context) {
        this._destroyVertexArrays();
        this._sortPolylinesIntoBuckets();
        //stores all of the individual indices arrays.
        var totalIndices = [];
        var indices = [];

        //used to determine the vertexBuffer offset if the indicesArray goes over 64k.
        //if it's the same polyline while it goes over 64k, the offset needs to backtrack componentsPerAttribute * componentDatatype bytes
        //so that the polyline looks contiguous.
        //if the polyline ends at the 64k mark, then the offset is just 64k * componentsPerAttribute * componentDatatype
        var vertexBufferOffset = [0];
        totalIndices.push(indices);
        var offset = 0;
        var useDepthTest = (this.morphTime !== 0.0);
        var vertexArrayBuckets = [[]];
        var totalLength = 0;
        var polylineBuckets = this._polylineBuckets;
        for ( var x in polylineBuckets) {
            if(polylineBuckets.hasOwnProperty(x)){
                var bucket = polylineBuckets[x];
                bucket.updateRenderState(context, useDepthTest);
                var lengthOfPositions = bucket.getLengthOfPositionsInBucket();
                bucket.lengthOfPositions = lengthOfPositions;
                totalLength += lengthOfPositions;
            }
        }
        if (totalLength > 0) {
            var positionArray = new Float32Array(totalLength * 3);
            var outlineColorArray = new Uint8Array(totalLength * 4);
            var colorArray = new Uint8Array(totalLength * 4);
            var pickColorArray = new Uint8Array(totalLength * 4);
            var showArray = new Uint8Array(totalLength);
            var position3DArray = undefined;

            var positionIndex = 0;
            var colorIndex = 0;
            var showIndex = 0;
            for ( var x in polylineBuckets) {
                if(polylineBuckets.hasOwnProperty(x)){
                    var bucket = polylineBuckets[x];
                    bucket.write(positionArray, colorArray, outlineColorArray, pickColorArray, showArray, positionIndex, showIndex, colorIndex, context);
                    if(this._mode === SceneMode.MORPHING){
                        if(typeof position3DArray === 'undefined'){
                            position3DArray = new Float32Array(totalLength * 3);
                        }
                        bucket.writeForMorph(position3DArray, positionIndex);
                    }
                    var bucketLength = bucket.lengthOfPositions;
                    positionIndex +=  bucketLength * 3;
                    showIndex += bucketLength;
                    colorIndex += bucketLength * 4;
                    offset += bucket.updateIndices(totalIndices, vertexBufferOffset, vertexArrayBuckets, offset);
                }
            }
            this._positionBuffer = context.createVertexBuffer(positionArray, this._buffersUsage[POSITION_INDEX]);
            var position3DBuffer = undefined;
            if(typeof position3DArray !== 'undefined'){
                position3DBuffer = context.createVertexBuffer(position3DArray, this._buffersUsage[POSITION_INDEX]);
            }
            this._outlineColorBuffer = context.createVertexBuffer(outlineColorArray, this._buffersUsage[OUTLINE_COLOR_INDEX]);
            this._colorBuffer = context.createVertexBuffer(colorArray, this._buffersUsage[COLOR_INDEX]);
            this._pickColorBuffer = context.createVertexBuffer(pickColorArray, BufferUsage.STATIC_DRAW);
            this._showBuffer = context.createVertexBuffer(showArray, this._buffersUsage[SHOW_INDEX]);
            var colorSizeInBytes = 4 * Uint8Array.BYTES_PER_ELEMENT;
            var positionSizeInBytes = 3 * Float32Array.BYTES_PER_ELEMENT;
            var vbo = 0;
            var numberOfIndicesArrays = totalIndices.length;
            for ( var k = 0; k < numberOfIndicesArrays; ++k) {
                var indices = totalIndices[k];
                if (indices.length > 0) {
                    var indicesArray = new Uint16Array(indices);
                    var indexBuffer = context.createIndexBuffer(indicesArray, BufferUsage.STATIC_DRAW, IndexDatatype.UNSIGNED_SHORT);
                    indexBuffer.setVertexArrayDestroyable(false);
                    vbo += vertexBufferOffset[k];
                    var vertexPositionBufferOffset = k * (positionSizeInBytes * SIXTYFOURK) - vbo * positionSizeInBytes;//componentsPerAttribute(3) * componentDatatype(4)
                    var vertexColorBufferOffset = k * (colorSizeInBytes * SIXTYFOURK) - vbo * colorSizeInBytes;
                    var vertexShowBufferOffset = k * SIXTYFOURK - vbo;
                    var attributes = [{
                        index : attributeIndices.position3D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.position2D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.color,
                        componentsPerAttribute : 4,
                        normalize : true,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._colorBuffer,
                        offsetInBytes : vertexColorBufferOffset
                    }, {
                        index : attributeIndices.show,
                        componentsPerAttribute : 1,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._showBuffer,
                        offsetInBytes : vertexShowBufferOffset
                    }];

                    var attributesOutlineColor = [{
                        index : attributeIndices.position3D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.position2D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.color,
                        componentsPerAttribute : 4,
                        normalize : true,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._outlineColorBuffer,
                        offsetInBytes : vertexColorBufferOffset
                    }, {
                        index : attributeIndices.show,
                        componentsPerAttribute : 1,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._showBuffer,
                        offsetInBytes : vertexShowBufferOffset
                    }];

                    var attributesPickColor = [{
                        index : attributeIndices.position3D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.position2D,
                        componentsPerAttribute : 3,
                        componentDatatype : ComponentDatatype.FLOAT,
                        offsetInBytes : vertexPositionBufferOffset
                    }, {
                        index : attributeIndices.color,
                        componentsPerAttribute : 4,
                        normalize : true,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._pickColorBuffer,
                        offsetInBytes : vertexColorBufferOffset
                    }, {
                        index : attributeIndices.show,
                        componentsPerAttribute : 1,
                        componentDatatype : ComponentDatatype.UNSIGNED_BYTE,
                        vertexBuffer : this._showBuffer,
                        offsetInBytes : vertexShowBufferOffset
                    }];

                    if (this._mode === SceneMode.SCENE3D) {
                        attributes[0].vertexBuffer = this._positionBuffer;
                        attributes[1].value = [0.0, 0.0];
                        attributesOutlineColor[0].vertexBuffer = this._positionBuffer;
                        attributesOutlineColor[1].value = [0.0, 0.0];
                        attributesPickColor[0].vertexBuffer = this._positionBuffer;
                        attributesPickColor[1].value = [0.0, 0.0];
                    } else if(this._mode === SceneMode.SCENE2D || this._mode === SceneMode.COLUMBUS_VIEW){
                        attributes[0].value = [0.0, 0.0, 0.0];
                        attributes[1].vertexBuffer = this._positionBuffer;
                        attributesOutlineColor[0].value = [0.0, 0.0, 0.0];
                        attributesOutlineColor[1].vertexBuffer = this._positionBuffer;
                        attributesPickColor[0].value = [0.0, 0.0, 0.0];
                        attributesPickColor[1].vertexBuffer = this._positionBuffer;
                    } else{
                        attributes[0].vertexBuffer = position3DBuffer;
                        attributes[1].vertexBuffer = this._positionBuffer;
                        attributesOutlineColor[0].vertexBuffer = position3DBuffer;
                        attributesOutlineColor[1].vertexBuffer = this._positionBuffer;
                        attributesPickColor[0].vertexBuffer = position3DBuffer;
                        attributesPickColor[1].vertexBuffer = this._positionBuffer;
                    }
                    var va = context.createVertexArray(attributes, indexBuffer);
                    var vaOutlineColor = context.createVertexArray(attributesOutlineColor, indexBuffer);
                    var vaPickColor = context.createVertexArray(attributesPickColor, indexBuffer);

                    this._colorVertexArrays.push({
                        va : va,
                        buckets : vertexArrayBuckets[k]
                    });
                    this._outlineColorVertexArrays.push({
                        va : vaOutlineColor,
                        buckets : vertexArrayBuckets[k]
                    });
                    this._pickColorVertexArrays.push({
                        va : vaPickColor,
                        buckets : vertexArrayBuckets[k]
                    });
                }
            }
        }
    }