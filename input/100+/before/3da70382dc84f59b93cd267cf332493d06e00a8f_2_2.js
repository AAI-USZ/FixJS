function() {
            var west = Cesium.Math.toRadians(-77.0),
                south = Cesium.Math.toRadians(38.0),
                east = Cesium.Math.toRadians(-72.0),
                north = Cesium.Math.toRadians(42.0);

            scene.getCamera().viewExtent(ellipsoid, west, south, east, north);

            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-78, 38),
                new Cesium.Cartographic2(-78, 42),
                new Cesium.Cartographic2(-72, 42),
                new Cesium.Cartographic2(-72, 38),
                new Cesium.Cartographic2(-78, 38)
            ]));
            primitives.add(polyline);
        }