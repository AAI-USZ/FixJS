function getLabelPolygon(textWidth, textHeight, align, baseline, angle, margin){
        // From protovis' SvgLabel.js
        
        // In text line coordinates. y points downwards
        var x, y;
        
        switch (baseline) {
            case "middle":
                y = textHeight / 2; // estimate middle (textHeight is not em, the height of capital M)
                break;
              
            case "top":
                y = margin + textHeight;
                break;
          
            case "bottom":
                y = -margin; 
                break;
        }
        
        switch (align) {
            case "right": 
                x = -margin -textWidth; 
                break;
          
            case "center": 
                x = -textWidth / 2;
                break;
          
            case "left": 
                x = margin;
                break;
        }
        
        var bl = pv.vector(x, y);
        var br = bl.plus(textWidth, 0);
        var tr = br.plus(0, -textHeight);
        var tl = bl.plus(0, -textHeight);
        
        // Rotate
        
        if(angle !== 0){
            bl = bl.rotate(angle);
            br = br.rotate(angle);
            tl = tl.rotate(angle);
            tr = tr.rotate(angle);
        }
        
        return new pvc.Polygon([bl, br, tl, tr]);
    }