function(time) {
                        var lonLat = new Cartographic2(
                                CesiumMath.lerp(tile.extent.west, tile.extent.east, time.x),
                                CesiumMath.lerp(tile.extent.south, tile.extent.north, time.y));

                        var p = ellipsoid.toCartesian(lonLat).subtract(rtc);
                        vertices.push(p.x, p.y, p.z);

                        var u = (lonLat.longitude - tile.extent.west) * lonScalar;
                        var v = (lonLat.latitude - tile.extent.south) * latScalar;
                        vertices.push(u, v);

                        // TODO: This will not work if the projection's ellipsoid is different
                        // than the central body's ellipsoid.  Throw an exception?
                        var projectedLonLat = projection.project(lonLat).subtract(projectedRTC);
                        vertices.push(projectedLonLat.x, projectedLonLat.y);
                    }