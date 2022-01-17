function () {
            var sensors = new Cesium.SensorVolumeCollection(undefined);
            primitives.add(sensors);

            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            var lightColor = {
                red : 1.0,
                green : 1.0,
                blue : 0.0,
                alpha : 0.75
            };
            var darkColor = {
                red : 1.0,
                green : 0.0,
                blue : 0.0,
                alpha : 0.25
            };

            sensors.addComplexConic({
                modelMatrix: modelMatrix,
                outerHalfAngle: Cesium.Math.toRadians(30.0),
                innerHalfAngle: Cesium.Math.toRadians(25.0),
                radius: 20000000.0,
                outerMaterial : new Cesium.TieDyeMaterial({
                    lightColor : lightColor,
                    darkColor : darkColor
                }),
                innerMaterial : new Cesium.DotMaterial({
                    lightColor : lightColor,
                    darkColor : darkColor
                }),
                capMaterial : new Cesium.ColorMaterial({
                    color : {
                        red : 1.0,
                        green : 1.0,
                        blue : 0.0,
                        alpha : 0.75
                }}),
                silhouetteMaterial: new Cesium.ColorMaterial({
                    color: {
                        red: 0.5,
                        green: 0.5,
                        blue: 0.5,
                        alpha: 0.75
                    }
                })
            });
        }