function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-80.0, 30.0),
                new Cesium.Cartographic2(-70.0, 30.0),
                new Cesium.Cartographic2(-70.0, 40.0),
                new Cesium.Cartographic2(-80.0, 40.0)
            ]));
            polygon.material = new Cesium.VerticalStripeMaterial({
                repeat : 5.0
            });

            primitives.add(polygon);
        }