function(stats){
                if (stats.has_data){
                    var yMax = stats.y_max;
                    var yMin = 0;
                    var yDiff = yMax - yMin;
                    if(yDiff < 1e-10) {
                        component.yAxis.setRange(yMin, yMin + 0.5);
                    } else {
                        var padding = 0.2 * yDiff;
                        component.yAxis.setRange(yMin, yMax + padding);
                    }
                    component.plot.setStyle( component.plot.getStyle()); // Trigger a repaint)
                }
            }