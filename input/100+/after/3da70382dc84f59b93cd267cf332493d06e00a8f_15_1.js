function(description) {
        var desc = description || {};

        var extent = desc.extent.clone();
        var boundExtent = desc.boundaryExtent;
        var ellipsoid = desc.ellipsoid;
        var granularity = desc.granularity;
        var altitude = desc.altitude;
        var genTexCoords = desc.generateTextureCoords;
        var interleave = desc.interleave;
        var relativeToCenter = desc.relativeToCenter;

        var vertices = desc.vertices;
        var texCoords = desc.texCoords;
        var indices = desc.indices;

        if (boundExtent.south > boundExtent.north) {
            boundExtent.north += CesiumMath.TWO_PI;
            extent.north += CesiumMath.TWO_PI;
        }

        if (boundExtent.west > boundExtent.east) {
            boundExtent.east += CesiumMath.TWO_PI;
            extent.east += CesiumMath.TWO_PI;
        }

        // for computing texture coordinates
        var lonScalar = 1.0 / (extent.east - extent.west);
        var latScalar = 1.0 / (extent.north - extent.south);

        var i;
        var j;
        var rows = 0;
        var cols = 0;

        for (i = boundExtent.north;; i = i - granularity) {
            if (i < boundExtent.south) {
                i = boundExtent.south;
            }

            cols = 0;
            for (j = boundExtent.west;; j = j + granularity) {
                if (j > boundExtent.east) {
                    j = boundExtent.east;
                }

                var cartPosition = new Cartographic(j, i, altitude);
                var position = ellipsoid.cartographicToCartesian(cartPosition).subtract(relativeToCenter);
                vertices.push(position.x, position.y, position.z);

                if (genTexCoords) {
                    var u = (j - extent.west) * lonScalar;
                    var v = (i - extent.south) * latScalar;
                    if (interleave) {
                        vertices.push(u, v);
                    } else {
                        texCoords.push(u, v);
                    }
                }

                ++cols;

                if (j === boundExtent.east) {
                    break;
                }
            }
            ++rows;

            if (i === boundExtent.south) {
                break;
            }
        }

        var index = 0;
        for (i = 0; i < rows - 1; ++i) {
            for (j = 0; j < cols - 1; ++j) {
                var upperLeft = index;
                var lowerLeft = upperLeft + cols;
                var lowerRight = lowerLeft + 1;
                var upperRight = upperLeft + 1;

                indices.push(upperLeft, lowerLeft, upperRight);
                indices.push(upperRight, lowerLeft, lowerRight);

                ++index;
            }
            ++index;
        }
    }