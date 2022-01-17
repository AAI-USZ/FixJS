function() {
            var west = Cesium.Math.toRadians(-77.0),
                south = Cesium.Math.toRadians(38.0),
                east = Cesium.Math.toRadians(-72.0),
                north = Cesium.Math.toRadians(42.0);

            scene.getCamera().viewExtent(ellipsoid, west, south, east, north);

            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-78, 38),
                Cesium.Cartographic.fromDegrees(-78, 42),
                Cesium.Cartographic.fromDegrees(-72, 42),
                Cesium.Cartographic.fromDegrees(-72, 38),
                Cesium.Cartographic.fromDegrees(-78, 38)
            ]));
            primitives.add(polyline);
        }