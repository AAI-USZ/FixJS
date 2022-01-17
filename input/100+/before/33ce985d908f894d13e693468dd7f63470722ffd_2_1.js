function(description) {
        description = defaultValue(description, {});

        var heightmap = description.heightmap;
        var heightScale = description.heightScale;
        var heightOffset = description.heightOffset;
        var bytesPerHeight = description.bytesPerHeight;
        var strideBytes = description.strideBytes;
        var width = description.width;
        var height = description.height;

        var extent = description.extent;
        var granularityX = (extent.east - extent.west) / (width - 1);
        var granularityY = (extent.north - extent.south) / (height - 1);
        var generateTextureCoordinates = description.generateTextureCoordinates;
        var interleaveTextureCoordinates = description.interleaveTextureCoordinates;
        var relativeToCenter = description.relativeToCenter;

        var vertices = description.vertices;
        var textureCoordinates = description.textureCoordinates;
        var indices = description.indices;

        var radiiSquared = description.radiiSquared;
        var radiiSquaredX = radiiSquared.x;
        var radiiSquaredY = radiiSquared.y;
        var radiiSquaredZ = radiiSquared.z;

        var oneOverCentralBodySemimajorAxis = description.oneOverCentralBodySemimajorAxis;

        var cos = Math.cos;
        var sin = Math.sin;
        var sqrt = Math.sqrt;
        var atan = Math.atan;
        var exp = Math.exp;
        var piOverTwo = Math.PI / 2.0;

        var geographicWest = extent.west * oneOverCentralBodySemimajorAxis;
        var geographicSouth = piOverTwo - (2.0 * atan(exp(-extent.south * oneOverCentralBodySemimajorAxis)));
        var geographicEast = extent.east * oneOverCentralBodySemimajorAxis;
        var geographicNorth = piOverTwo - (2.0 * atan(exp(-extent.north * oneOverCentralBodySemimajorAxis)));

        var vertexArrayIndex = 0;
        var textureCoordinatesIndex = 0;

        for ( var row = 0; row < height; ++row) {
            var y = extent.north - granularityY * row;
            var latitude = piOverTwo - (2.0 * atan(exp(-y * oneOverCentralBodySemimajorAxis)));
            var cosLatitude = cos(latitude);
            var nZ = sin(latitude);
            var kZ = radiiSquaredZ * nZ;

            // texture coordinates for geographic imagery
            //var v = (latitude - geographicSouth) / (geographicNorth - geographicSouth);

            // texture coordinates for web mercator imagery
            var v = (height - row - 1) / (height - 1);

            for ( var col = 0; col < width; ++col) {
                var x = extent.west + granularityX * col;
                var longitude = x * oneOverCentralBodySemimajorAxis;

                var terrainOffset = row * (width * strideBytes) + col * strideBytes;
                var heightSample = heightmap[terrainOffset] << 16;
                heightSample += heightmap[terrainOffset + 1] << 8;
                heightSample += heightmap[terrainOffset + 2];

                if (bytesPerHeight === 4) {
                    heightSample = (heightSample << 8) + heightmap[terrainOffset + 3];
                }

                heightSample = heightSample / heightScale - heightOffset;

                //heightSample = 10000 * sin(CesiumMath.toDegrees(longitude) * 10) + 10000 * cos(CesiumMath.toDegrees(latitude) * 10);

                var nX = cosLatitude * cos(longitude);
                var nY = cosLatitude * sin(longitude);

                var kX = radiiSquaredX * nX;
                var kY = radiiSquaredY * nY;

                var gamma = sqrt((kX * nX) + (kY * nY) + (kZ * nZ));

                var rSurfaceX = kX / gamma;
                var rSurfaceY = kY / gamma;
                var rSurfaceZ = kZ / gamma;

                vertices[vertexArrayIndex++] = rSurfaceX + nX * heightSample - relativeToCenter.x;
                vertices[vertexArrayIndex++] = rSurfaceY + nY * heightSample - relativeToCenter.y;
                vertices[vertexArrayIndex++] = rSurfaceZ + nZ * heightSample - relativeToCenter.z;

                if (generateTextureCoordinates) {
                    // texture coordinates for geographic imagery
                    //var u = (longitude - geographicWest) / (geographicEast - geographicWest);

                    // texture coordinates for web mercator imagery
                    var u = col / (width - 1);
                    if (interleaveTextureCoordinates) {
                        vertices[vertexArrayIndex++] = u;
                        vertices[vertexArrayIndex++] = v;
                    } else {
                        textureCoordinates[textureCoordinatesIndex++] = u;
                        textureCoordinates[textureCoordinatesIndex++] = v;
                    }
                }
            }
        }

        if (typeof indices !== 'undefined') {
            var index = 0;
            var indicesIndex = 0;
            for ( var i = 0; i < height - 1; ++i) {
                for ( var j = 0; j < width - 1; ++j) {
                    var upperLeft = index;
                    var lowerLeft = upperLeft + width;
                    var lowerRight = lowerLeft + 1;
                    var upperRight = upperLeft + 1;

                    indices[indicesIndex++] = upperLeft;
                    indices[indicesIndex++] = lowerLeft;
                    indices[indicesIndex++] = upperRight;
                    indices[indicesIndex++] = upperRight;
                    indices[indicesIndex++] = lowerLeft;
                    indices[indicesIndex++] = lowerRight;

                    ++index;
                }
                ++index;
            }
        }
    }