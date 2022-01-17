function(positions, indices, granularity) {
            if (!positions) {
                throw new DeveloperError('positions is required.');
            }

            if (!indices) {
                throw new DeveloperError('indices is required.');
            }

            if (indices.length < 3) {
                throw new DeveloperError('At least three indices are required.');
            }

            if (indices.length % 3 !== 0) {
                throw new DeveloperError('The number of indices must be divisable by three.');
            }

            granularity = granularity || CesiumMath.toRadians(1.0);
            if (granularity <= 0.0) {
                throw new DeveloperError('granularity must be greater than zero.');
            }

            // Use a queue for triangles that need (or might need) to be subdivided.
            var triangles = new Queue();

            var indicesLength = indices.length;
            for ( var j = 0; j < indicesLength; j += 3) {
                triangles.enqueue({
                    i0 : indices[j],
                    i1 : indices[j + 1],
                    i2 : indices[j + 2]
                });
            }

            // New positions due to edge splits are appended to the positions list.
            var subdividedPositions = positions.slice(0); // shadow copy!
            var subdividedIndices = [];

            // Used to make sure shared edges are not split more than once.
            var edges = {};

            var i;
            while (triangles.length > 0) {
                var triangle = triangles.dequeue();

                var v0 = subdividedPositions[triangle.i0];
                var v1 = subdividedPositions[triangle.i1];
                var v2 = subdividedPositions[triangle.i2];

                var g0 = v0.angleBetween(v1);
                var g1 = v1.angleBetween(v2);
                var g2 = v2.angleBetween(v0);

                var max = Math.max(g0, Math.max(g1, g2));
                var edge;

                if (max > granularity) {
                    if (g0 === max) {
                        edge = Math.min(triangle.i0, triangle.i1).toString() + ' ' + Math.max(triangle.i0, triangle.i1).toString();

                        i = edges[edge];
                        if (!i) {
                            subdividedPositions.push(v0.add(v1).multiplyWithScalar(0.5));
                            i = subdividedPositions.length - 1;
                            edges[edge] = i;
                        }

                        triangles.enqueue({
                            i0 : triangle.i0,
                            i1 : i,
                            i2 : triangle.i2
                        });
                        triangles.enqueue({
                            i0 : i,
                            i1 : triangle.i1,
                            i2 : triangle.i2
                        });
                    } else if (g1 === max) {
                        edge = Math.min(triangle.i1, triangle.i2).toString() + ' ' + Math.max(triangle.i1, triangle.i2).toString();

                        i = edges[edge];
                        if (!i) {
                            subdividedPositions.push(v1.add(v2).multiplyWithScalar(0.5));
                            i = subdividedPositions.length - 1;
                            edges[edge] = i;
                        }

                        triangles.enqueue({
                            i0 : triangle.i1,
                            i1 : i,
                            i2 : triangle.i0
                        });
                        triangles.enqueue({
                            i0 : i,
                            i1 : triangle.i2,
                            i2 : triangle.i0
                        });
                    } else if (g2 === max) {
                        edge = Math.min(triangle.i2, triangle.i0).toString() + ' ' + Math.max(triangle.i2, triangle.i0).toString();

                        i = edges[edge];
                        if (!i) {
                            subdividedPositions.push(v2.add(v0).multiplyWithScalar(0.5));
                            i = subdividedPositions.length - 1;
                            edges[edge] = i;
                        }

                        triangles.enqueue({
                            i0 : triangle.i2,
                            i1 : i,
                            i2 : triangle.i1
                        });
                        triangles.enqueue({
                            i0 : i,
                            i1 : triangle.i0,
                            i2 : triangle.i1
                        });
                    }
                } else {
                    subdividedIndices.push(triangle.i0);
                    subdividedIndices.push(triangle.i1);
                    subdividedIndices.push(triangle.i2);
                }
            }

            // PERFORMANCE_IDEA Rather that waste time re-iterating the entire set of positions
            // here, all of the above code can be refactored to flatten as values are added
            // Removing the ned for this for loop.
            var length = subdividedPositions.length;
            var flattenedPositions = new Array(length * 3);
            var q = 0;
            for (i = 0; i < length; i++) {
                var item = subdividedPositions[i];
                flattenedPositions[q++] = (item.x);
                flattenedPositions[q++] = (item.y);
                flattenedPositions[q++] = (item.z);
            }

            return {
                attributes : {
                    position : {
                        componentDatatype : ComponentDatatype.FLOAT,
                        componentsPerAttribute : 3,
                        values : flattenedPositions
                    }
                },

                indexLists : [{
                    primitiveType : PrimitiveType.TRIANGLES,
                    values : subdividedIndices
                }]
            };
        }