function () {
            var center = ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883));

            // The arrow points to the east, i.e. along the local x-axis.
            var polyline = new Cesium.Polyline(undefined);
            polyline.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
            polyline.setPositions([
                new Cesium.Cartesian3(0.0, 0.0, 0.0),
                new Cesium.Cartesian3(1000000.0, 0.0, 0.0),
                new Cesium.Cartesian3(900000.0, -100000.0, 0.0),
                new Cesium.Cartesian3(900000.0, 100000.0, 0.0),
                new Cesium.Cartesian3(1000000.0, 0.0, 0.0)
            ]);

            primitives.add(polyline);
        }