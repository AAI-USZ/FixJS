function () {
            var sensors;
            var sensor;
            var eroding = false;

            // If the mouse is over the billboard, change its scale and color
            handler = new Cesium.EventHandler(scene.getCanvas());
            handler.setMouseAction(
                function (movement) {
                    var pickedObject = scene.pick(movement.position);
                    if (!eroding && (pickedObject === sensor)) {
                        // Prevent multiple erosions
                        eroding = true;

                        scene.getAnimations().addProperty(sensor, 'erosion', 1.0, 0.0, {
                            onComplete : function() {
                                sensors.remove(sensor);
                            }
                        });
                    }
                },
                Cesium.MouseEventType.LEFT_DOUBLE_CLICK
            );

            // Setup code
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-90.0, 0.0)));
            modelMatrix = modelMatrix.multiplyWithMatrix(Cesium.Matrix4.createTranslation(new Cesium.Cartesian3(3000000.0, 0.0, -3000000.0)));

            sensors = new Cesium.SensorVolumeCollection(undefined);
            sensor = sensors.addRectangularPyramid({
                modelMatrix : modelMatrix,
                radius : 20000000.0,
                xHalfAngle : Cesium.Math.toRadians(40.0),
                yHalfAngle : Cesium.Math.toRadians(20.0)
            });

            primitives.add(sensors);
        }