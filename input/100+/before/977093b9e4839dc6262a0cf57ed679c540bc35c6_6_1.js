function () {
            var polygon;
            var animation;

            var outside = {
                lightColorRed : 0.25,
                lightColorGreen : 0.5,
                lightColorBlue : 0.0,
                lightColorAlpha : 0.25,
                darkColorRed : 0.2,
                darkColorGreen : 0.2,
                darkColorBlue : 0.2,
                darkColorAlpha : 0.25
            };

            var inside = {
                lightColorRed : 0.5,
                lightColorGreen : 1.0,
                lightColorBlue : 0.0,
                lightColorAlpha : 0.85,
                darkColorRed : 0.6,
                darkColorGreen : 0.6,
                darkColorBlue : 0.6,
                darkColorAlpha : 0.85
            };

            function update(value) {
                polygon.material.lightColor = {
                    red : value.lightColorRed,
                    green : value.lightColorGreen,
                    blue : value.lightColorBlue,
                    alpha : value.lightColorAlpha
                };
                polygon.material.darkColor = {
                    red : value.darkColorRed,
                    green : value.darkColorGreen,
                    blue : value.darkColorBlue,
                    alpha : value.darkColorAlpha
                };
            }

            function complete() {
                animation = undefined;
                polygon.highlighted = !polygon.highlighted;
            }

            // If the mouse is over the billboard, change its scale and color
            handler = new Cesium.EventHandler(scene.getCanvas());
            handler.setMouseAction(
                function (movement) {
                    if (polygon) {
                        var pickedObject = scene.pick(movement.endPosition);
                        if ((pickedObject === polygon) && !polygon.highlighted) {
                            // on enter
                            animation = animation || scene.getAnimations().add({
                                onUpdate : update,
                                onComplete : complete,
                                startValue : outside,
                                stopValue : inside,
                                duration : 1000,
                                easingFunction : Cesium.Tween.Easing.Quartic.EaseOut
                            });
                        }
                        else if ((pickedObject !== polygon) && polygon.highlighted) {
                            // on exit
                            animation = animation || scene.getAnimations().add({
                                onUpdate : update,
                                onComplete : complete,
                                startValue : inside,
                                stopValue : outside,
                                duration : 1000,
                                easingFunction : Cesium.Tween.Easing.Quartic.EaseOut
                            });
                        }
                    }
                },
                Cesium.MouseEventType.MOVE
            );

            // Setup code
            polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(Cesium.Shapes.computeCircleBoundary(
                ellipsoid, ellipsoid.cartographicDegreesToCartesian(
                    new Cesium.Cartographic2(-75.59777, 40.03883)), 800000.0));
            polygon.material = new Cesium.CheckerboardMaterial(undefined);
            polygon.material.lightColor = {
                red : outside.lightColorRed,
                green : outside.lightColorGreen,
                blue : outside.lightColorBlue,
                alpha : outside.lightColorAlpha
            };
            polygon.material.darkColor = {
                red : outside.darkColorRed,
                green : outside.darkColorGreen,
                blue : outside.darkColorBlue,
                alpha : outside.darkColorAlpha
            };

            primitives.add(polygon);
        }