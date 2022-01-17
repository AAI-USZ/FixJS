function getInstanceBounds(mark) {
        /*
         * Compute bounding box. 
         * TODO: support area, lines. 
         */
        var left, top, width, height;
        if (mark.properties.width) {
            // Bar, panel
            var bounds = getVisibleScreenBounds(mark);
            
            left = bounds.left;
            top  = bounds.top;
            width  = bounds.width;
            height = bounds.height;
            
        } else {
            /* Compute the transform to offset the tooltip position. */
            var t = toScreenTransform(mark.parent);
            var instance = mark.instance();
            var radius;
            if(mark.properties.outerRadius){
                // Wedge
                var midAngle = instance.startAngle + instance.angle / 2;
                radius = instance.outerRadius;// - (instance.outerRadius - instance.innerRadius) * 0.05;
                
                left = t.x + instance.left + radius * Math.cos(midAngle);
                top  = t.y + instance.top  + radius * Math.sin(midAngle);
                
            } else if(mark.properties.shapeRadius){
                radius = Math.max(2, instance.shapeRadius);
                var cx = instance.left;
                var cy = instance.top;
    
                switch(instance.shape){
                    case 'diamond':
                        radius *= Math.SQRT2;
                        // NOTE fall through
                        break;
                    
                    case 'circle':
                        // Want the inscribed square
                        radius /= Math.SQRT2;
                        break;
                }
                
                left = (cx - radius) * t.k + t.x;
                top  = (cy - radius) * t.k + t.y;
                height = width = 2*radius * t.k;
                
                
            } else {
                left = instance.left * t.k + t.x;
                top  = instance.top  * t.k + t.y;
            }
        }
        
        var left2 = Math.ceil(left);
        var top2  = Math.ceil(top);
        
        var leftE = left2 - left; // >= 0 / < 1
        var topE  = top2  - top;  // >= 0 / < 1
        
        width  = Math.max(1, Math.floor((width  || 0) - leftE));
        height = Math.max(1, Math.floor((height || 0) - topE ));
        
        return { left: left2, top: top2, width: width, height: height };
    }