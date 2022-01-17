function Ease_interpolate_interpolationFunction() {
                time = Date.now() - start;
                if (time >= tween.config.duration + tween.config.delay) {
                    // Cancel...
                    tween.cancel();
                    // Set final values...
                    for (var key in tween.config.properties) {
                        if (key in tween.config.target) {
                            if (typeof tween.config.target[key] === 'function') {
                                // Apply the setter function...
                                tween.config.target[key](tween.config.properties[key]);
                            } else {
                                tween.config.target[key] = tween.config.properties[key];
                            }
                        }
                    }
                    // Update...
                    tween.config.onUpdate.apply(null, tween.config.onUpdateParams);
                    // Call onComplete...
                    tween.config.onComplete.apply(null, tween.config.onCompleteParams);
                    // Call Task's go again...
                    Task.prototype.go.call(tween);
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
                    }
                    // Update...
                    tween.config.onUpdate.apply(null, tween.config.onUpdateParams);
                }
            }