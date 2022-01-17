function () {
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic2(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var material = new Cesium.CheckerboardMaterial(undefined);

            var sensors = new Cesium.SensorVolumeCollection(undefined);
            var sensor = sensors.addComplexConic({
                modelMatrix : modelMatrix,
                outerHalfAngle : Cesium.Math.toRadians(30.0),
                innerHalfAngle : Cesium.Math.toRadians(20.0),
                radius : 20000000.0,
                outerMaterial : material,
                innerMaterial : material,
                capMaterial : material
            });
            primitives.add(sensors);

            scene.getAnimations().addProperty(sensor, 'erosion', 0.0, 1.0);
        }