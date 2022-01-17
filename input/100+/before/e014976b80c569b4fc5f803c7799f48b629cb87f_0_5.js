function(){
                var sizeValExtent = data.dimensions(sizeDimName).extent({visible: true});
                if(sizeValExtent){
                    var sizeValMin   = sizeValExtent.min.value,
                        sizeValMax   = sizeValExtent.max.value,
                        sizeValSpan  = Math.abs(sizeValMax - sizeValMin); // may be zero
                    
                    if(isFinite(sizeValSpan) && sizeValSpan > 0.001) {
                        // Linear mapping
                        // TODO: a linear scale object??
                        var sizeSlope = areaSpan / sizeValSpan;
                        
                        sizeValueToArea = function(sizeVal){
                            return minArea + sizeSlope * (sizeVal == null ? 0 : (sizeVal - sizeValMin));
                        };
                    }
                }
            }