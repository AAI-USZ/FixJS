function () {
            // Mouse over the globe to see the cartographic position
            handler = new Cesium.EventHandler(scene.getCanvas());
            handler.setMouseAction(
                function (movement) {
                    var p = scene.pickEllipsoid(movement.endPosition, ellipsoid);
                    if (p) {
                        var d = Cesium.Math.cartographic2ToDegrees(ellipsoid.toCartographic2(p));
                        label.setShow(true);
                        label.setText('(' + d.longitude.toFixed(2) + ', ' + d.latitude.toFixed(2) + ')');
                        label.setPosition(p);
                    }
                    else {
                        label.setText('');
                    }
                },
                Cesium.MouseEventType.MOVE
            );

            // Setup code
            var labels = new Cesium.LabelCollection(undefined);
            label = labels.add();
            primitives.add(labels);
        }