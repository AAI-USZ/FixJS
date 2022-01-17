function () {
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var directions = [];
            for (var i = 0; i < 20; ++i) {
                directions.push({
                    clock : Cesium.Math.toRadians(18.0 * i),
                    cone : Cesium.Math.toRadians(25.0)
                });
            }

            var sensors = new Cesium.SensorVolumeCollection(undefined);
            sensors.addCustom({
                modelMatrix : modelMatrix,
                radius : 20000000.0,
                directions : directions
            });
            primitives.add(sensors);
        }