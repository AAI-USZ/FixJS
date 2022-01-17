function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-80.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 40.0),
                Cesium.Cartographic.fromDegrees(-80.0, 40.0)
            ]));
            polygon.material = new Cesium.CheckerboardMaterial({
                sRepeat : 5,
                tRepeat : 5
            });
            primitives.add(polygon);

            scene.getAnimations().addProperty(polygon, 'height', 2000000.0, 0.0);
        }