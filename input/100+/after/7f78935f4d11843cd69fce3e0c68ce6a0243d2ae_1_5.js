function(totalIndices, vertexBufferOffset, vertexArrayBuckets, offset){
        var vaCount = vertexArrayBuckets.length - 1;
        var bucketLocator = new VertexArrayBucketLocator(0, offset, this);
        vertexArrayBuckets[vaCount].push(bucketLocator);
        var count = 0;
        var indices = totalIndices[totalIndices.length - 1];
        var indicesCount = 0;
        if(indices.length > 0){
            indicesCount = indices[indices.length - 1] + 1;
        }
        var polylines = this.polylines;
        var length = polylines.length;
        for ( var i = 0; i < length; ++i) {
            var polyline = polylines[i];
            var segments = polyline._segments;
            var numberOfSegments = segments.length;
            for ( var k = 0; k < numberOfSegments; ++k) {
                var segment = segments[k];
                var segmentLength = segment.length;
                var startN = ((k === 0) || (segmentLength === 2)) ? 0 : 1;
                for ( var n = startN; n < segmentLength; ++n) {
                    if (n !== segmentLength - 1) {
                        if (indicesCount === SIXTYFOURK - 1) {
                            vertexBufferOffset.push(1);
                            indices = [];
                            totalIndices.push(indices);
                            indicesCount = 0;
                            bucketLocator.count = count;
                            count = 0;
                            offset = 0;
                            bucketLocator = new VertexArrayBucketLocator(0, 0, this);
                            vertexArrayBuckets[++vaCount] = [bucketLocator];
                        }
                        count += 2;
                        offset += 2;
                        indices.push(indicesCount++);
                        indices.push(indicesCount);
                    }
                }
                if(k !== numberOfSegments - 1){
                    indicesCount++;
                }
            }
            polyline._clean();
            if(indicesCount < SIXTYFOURK - 1){
                indicesCount++;
            } else {
                vertexBufferOffset.push(0);
                indices = [];
                totalIndices.push(indices);
                indicesCount = 0;
                bucketLocator.count = count;
                offset = 0;
                count = 0;
                bucketLocator = new VertexArrayBucketLocator(0, 0, this);
                vertexArrayBuckets[++vaCount] = [bucketLocator];
            }
        }
        bucketLocator.count = count;
        return offset;
    }