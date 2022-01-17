function () {
            var sensors = new Cesium.SensorVolumeCollection(undefined);
            primitives.add(sensors);

            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.10, 39.57)));

            var sensor = sensors.addComplexConic({
                modelMatrix: modelMatrix,
                outerHalfAngle: Cesium.Math.toRadians(30.0),
                innerHalfAngle: Cesium.Math.toRadians(20.0),
                radius: 6000000.0
            });

            sensor.outerMaterial.color = {
                red   : 1.0,
                green : 0.0,
                blue  : 1.0,
                alpha : 0.5
            };
            sensor.innerMaterial.color = {
                red : 1.0,
                green : 1.0,
                blue : 0.0,
                alpha : 0.5
            };
            sensor.capMaterial.color = {
                red : 0.0,
                green : 1.0,
                blue : 1.0,
                alpha : 0.5
            };
            sensor.intersectionColor = {
                red : 1.0,
                green : 1.0,
                blue : 1.0,
                alpha : 1.0
            };
        }