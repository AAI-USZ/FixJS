function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic3(-80.0, 30.0),
                new Cesium.Cartographic3(-70.0, 30.0),
                new Cesium.Cartographic3(-70.0, 40.0),
                new Cesium.Cartographic3(-80.0, 40.0)
            ]));
            polygon.material = new Cesium.DotMaterial({
                lightColor: {
                    red: 1.0,
                    green: 1.0,
                    blue: 0.0,
                    alpha: 0.75
                },
                darkColor: {
                    red: 0.0,
                    green: 1.0,
                    blue: 1.0,
                    alpha: 0.75
                },
                sRepeat : 5,
                tRepeat : 5
            });

            primitives.add(polygon);
        }