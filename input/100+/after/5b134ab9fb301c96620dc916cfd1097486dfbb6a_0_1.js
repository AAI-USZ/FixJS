function(stats){
                if (stats.has_data){
                    var yMax = stats.y_max;
                    var yMin = positiveOnly ? 0 : stats.y_min;
                    var yDiff = yMax - yMin;
                    if(yDiff < 1e-10) {
                        component.yAxis.setRange(yMin - 0.5, yMin + 0.5);
                    } else {
                        var padding = 0.075 * yDiff;
                        component.yAxis.setRange(positiveOnly ? yMin : yMin - padding, yMax + padding);
                    }
                    component.plot.setStyle( component.plot.getStyle()); // Trigger a repaint)
                }
            }