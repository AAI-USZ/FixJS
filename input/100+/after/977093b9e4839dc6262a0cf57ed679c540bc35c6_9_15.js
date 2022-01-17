function () {
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var material = new Cesium.CheckerboardMaterial(undefined);

            var sensors = new Cesium.SensorVolumeCollection(undefined);
            var sensor = sensors.addRectangularPyramid({
                modelMatrix : modelMatrix,
                radius : 20000000.0,
                xHalfAngle : Cesium.Math.toRadians(40.0),
                yHalfAngle : Cesium.Math.toRadians(20.0),
                material : material
            });
            primitives.add(sensors);

            // Start alpha 0.0.  End alpha 0.7.
            scene.getAnimations().addAlpha(material, 0.0, 0.7); // Animate material colors
            scene.getAnimations().addAlpha(sensor, 0.0, 0.7);   // Animate intersection color
        }