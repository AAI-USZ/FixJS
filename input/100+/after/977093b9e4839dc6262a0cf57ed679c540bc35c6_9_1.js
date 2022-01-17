function () {
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var sensors = new Cesium.SensorVolumeCollection(undefined);
            sensors.addRectangularPyramid({
                modelMatrix : modelMatrix,
                radius : 20000000.0,
                xHalfAngle : Cesium.Math.toRadians(40.0),
                yHalfAngle : Cesium.Math.toRadians(20.0)
            });
            primitives.add(sensors);
        }