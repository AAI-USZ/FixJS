function(ellipsoid, numberOfPartitions, attributeName) {
        if (numberOfPartitions <= 0) {
            throw new DeveloperError('numberOfPartitions must be greater than zero.');
        }

        attributeName = attributeName || 'position';

        var positions = [];
        var indices = [];

        function addEdgePositions(i0, i1) {
            var indices = [];
            indices[0] = i0;
            indices[2 + (numberOfPartitions - 1) - 1] = i1;

            var origin = positions[i0];
            var direction = positions[i1].subtract(positions[i0]);

            for ( var i = 1; i < numberOfPartitions; ++i) {
                var delta = i / numberOfPartitions;

                indices[i] = positions.length;
                positions.push(origin.add(direction.multiplyWithScalar(delta)));
            }

            return indices;
        }

        function addFaceTriangles(leftBottomToTop, bottomLeftToRight, rightBottomToTop, topLeftToRight) {
            var origin = positions[bottomLeftToRight[0]];
            var x = positions[bottomLeftToRight[bottomLeftToRight.length - 1]].subtract(origin);
            var y = positions[topLeftToRight[0]].subtract(origin);

            var bottomIndicesBuffer = [];
            var topIndicesBuffer = [];

            var bottomIndices = bottomLeftToRight;
            var topIndices = topIndicesBuffer;

            for ( var j = 1; j <= numberOfPartitions; ++j) {
                if (j !== numberOfPartitions) {
                    if (j !== 1) {
                        //
                        // This copy could be avoided by ping ponging buffers.
                        //
                        bottomIndicesBuffer = topIndicesBuffer.slice(0);
                        bottomIndices = bottomIndicesBuffer;
                    }

                    topIndicesBuffer[0] = leftBottomToTop[j];
                    topIndicesBuffer[numberOfPartitions] = rightBottomToTop[j];

                    var deltaY = j / numberOfPartitions;
                    var offsetY = y.multiplyWithScalar(deltaY);

                    for ( var i = 1; i < numberOfPartitions; ++i) {
                        var deltaX = i / numberOfPartitions;
                        var offsetX = x.multiplyWithScalar(deltaX);

                        topIndicesBuffer[i] = positions.length;
                        positions.push(origin.add(offsetX).add(offsetY));
                    }
                } else {
                    if (j !== 1) {
                        bottomIndices = topIndicesBuffer;
                    }
                    topIndices = topLeftToRight;
                }

                for ( var k = 0; k < numberOfPartitions; ++k) {
                    indices.push(bottomIndices[k]);
                    indices.push(bottomIndices[k + 1]);
                    indices.push(topIndices[k + 1]);

                    indices.push(bottomIndices[k]);
                    indices.push(topIndices[k + 1]);
                    indices.push(topIndices[k]);
                }
            }
        }

        //
        // Initial cube.  In the plane, z = -1:
        //
        //                   +y
        //                    |
        //             Q2     * p3     Q1
        //                  / | \
        //              p0 *--+--* p2   +x
        //                  \ | /
        //             Q3     * p1     Q4
        //                    |
        //
        // Similarly, p4 to p7 are in the plane z = 1.
        //
        positions.push(new Cartesian3(-1, 0, -1));
        positions.push(new Cartesian3(0, -1, -1));
        positions.push(new Cartesian3(1, 0, -1));
        positions.push(new Cartesian3(0, 1, -1));
        positions.push(new Cartesian3(-1, 0, 1));
        positions.push(new Cartesian3(0, -1, 1));
        positions.push(new Cartesian3(1, 0, 1));
        positions.push(new Cartesian3(0, 1, 1));

        //
        // Edges
        //
        // 0 -> 1, 1 -> 2, 2 -> 3, 3 -> 0.  Plane z = -1
        // 4 -> 5, 5 -> 6, 6 -> 7, 7 -> 4.  Plane z = 1
        // 0 -> 4, 1 -> 5, 2 -> 6, 3 -> 7.  From plane z = -1 to plane z - 1
        //
        var edge0to1 = addEdgePositions(0, 1);
        var edge1to2 = addEdgePositions(1, 2);
        var edge2to3 = addEdgePositions(2, 3);
        var edge3to0 = addEdgePositions(3, 0);

        var edge4to5 = addEdgePositions(4, 5);
        var edge5to6 = addEdgePositions(5, 6);
        var edge6to7 = addEdgePositions(6, 7);
        var edge7to4 = addEdgePositions(7, 4);

        var edge0to4 = addEdgePositions(0, 4);
        var edge1to5 = addEdgePositions(1, 5);
        var edge2to6 = addEdgePositions(2, 6);
        var edge3to7 = addEdgePositions(3, 7);

        addFaceTriangles(edge0to4, edge0to1, edge1to5, edge4to5); // Q3 Face
        addFaceTriangles(edge1to5, edge1to2, edge2to6, edge5to6); // Q4 Face
        addFaceTriangles(edge2to6, edge2to3, edge3to7, edge6to7); // Q1 Face
        addFaceTriangles(edge3to7, edge3to0, edge0to4, edge7to4); // Q2 Face
        addFaceTriangles(edge7to4.slice(0).reverse(), edge4to5, edge5to6, edge6to7.slice(0).reverse()); // Plane z = 1
        addFaceTriangles(edge1to2, edge0to1.slice(0).reverse(), edge3to0.slice(0).reverse(), edge2to3); // Plane z = -1

        // Expand cube into ellipsoid.
        var radii = ellipsoid.getRadii();
        for ( var i = 0; i < positions.length; ++i) {
            positions[i] = positions[i].normalize().multiplyComponents(radii);
        }

        var mesh = {};
        mesh.attributes = {};
        mesh.indexLists = [];

        mesh.attributes[attributeName] = {
            componentDatatype : ComponentDatatype.FLOAT,
            componentsPerAttribute : 3,
            values : Cartesian3.flatten(positions)
        };

        mesh.indexLists.push({
            primitiveType : PrimitiveType.TRIANGLES,
            values : indices
        });

        return mesh;
    }