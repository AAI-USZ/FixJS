function() {
            var center = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883));
            var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

            var spindle = scene.getCamera().getControllers().get(0).spindleController;
            spindle.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
            spindle.setReferenceFrame(transform, Cesium.Ellipsoid.UNIT_SPHERE);

            // draw x axis in red
            var xAxis = new Cesium.Polyline(undefined);
            xAxis.modelMatrix = transform;
            xAxis.color = {red : 1.0, green : 0.0, blue : 0.0, alpha : 1.0 };
            xAxis.setPositions([
                Cesium.Cartesian3.ZERO,
                Cesium.Cartesian3.UNIT_X.multiplyByScalar(100000.0)
            ]);
            primitives.add(xAxis);

            // draw y axis in green
            var yAxis = new Cesium.Polyline(undefined);
            yAxis.modelMatrix = transform;
            yAxis.color = {red : 0.0, green : 1.0, blue : 0.0, alpha : 1.0 };
            yAxis.setPositions([
                Cesium.Cartesian3.ZERO,
                Cesium.Cartesian3.UNIT_Y.multiplyByScalar(100000.0)
            ]);
            primitives.add(yAxis);

            // draw z axis in blue
            var zAxis = new Cesium.Polyline(undefined);
            zAxis.modelMatrix = transform;
            zAxis.color = {red : 0.0, green : 0.0, blue : 1.0, alpha : 1.0 };
            zAxis.setPositions([
                Cesium.Cartesian3.ZERO,
                Cesium.Cartesian3.UNIT_Z.multiplyByScalar(100000.0)
            ]);
            primitives.add(zAxis);
        }