function () {
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var material = new Cesium.DistanceIntervalMaterial({
                intervals : [
                    {
                        distance : 1000000.0,
                        color : {
                            red   : 1.0,
                            green : 0.0,
                            blue  : 0.0,
                            alpha : 0.5
                        }
                    },
                    {
                        distance : 10000000.0,
                        color : {
                            red   : 0.0,
                            green : 1.0,
                            blue  : 0.0,
                            alpha : 0.5
                        }
                    },
                    {
                        distance : 20000000.0,
                        color : {
                            red   : 0.0,
                            green : 0.0,
                            blue  : 1.0,
                            alpha : 0.5
                        }
                    }
                ]
            });

            var sensors = new Cesium.SensorVolumeCollection(undefined);
            sensors.addComplexConic({
                modelMatrix : modelMatrix,
                outerHalfAngle : Cesium.Math.toRadians(30.0),
                innerHalfAngle : Cesium.Math.toRadians(20.0),
                radius : 20000000.0,
                outerMaterial : material,
                innerMaterial : material,
                capMaterial : material
            });
            primitives.add(sensors);
        }