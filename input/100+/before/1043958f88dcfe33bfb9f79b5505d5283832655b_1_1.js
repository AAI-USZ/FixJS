function Ease_interpolate_interpolationFunction() {
                time = Date.now() - start;
                if (time >= tween.config.duration + tween.config.delay) {
                    tween.finish();
                } else if (time >= tween.config.delay) {
                    var t_interpolate = time - tween.config.delay;
                    for (var key in fromProperties) {
                        var from = fromProperties[key];
                        var delta = deltaProperties[key];
                        var current = tween.config.equation(t_interpolate, from, delta, tween.config.duration);
                        if (propertyTypeIsFunction[key]) {
                            tween.config.target[key](current);
                        } else {
                            tween.config.target[key] = current;
                        }
                        // Update...
                        tween.config.onUpdate.apply(null, tween.config.onUpdateParams);
                    }
                }
            }