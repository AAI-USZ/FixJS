function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic3(-72.0, 40.0),
                new Cesium.Cartographic3(-70.0, 35.0),
                new Cesium.Cartographic3(-75.0, 30.0),
                new Cesium.Cartographic3(-70.0, 30.0),
                new Cesium.Cartographic3(-68.0, 40.0)
            ]));

            // The color's alpha component defines the polygon's opacity.
            // 0 - completely transparent.  1.0 - completely opaque.
            polygon.material.color = {
                red : 1.0,
                green : 0.0,
                blue : 0.0,
                alpha : 0.75
            };

            primitives.add(polygon);
        }