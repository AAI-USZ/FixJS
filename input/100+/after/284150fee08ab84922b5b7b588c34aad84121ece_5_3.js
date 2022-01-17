function getLabelBBox(textWidth, textHeight, align, baseline, angle, margin){
        
        var polygon = getLabelPolygon(textWidth, textHeight, align, baseline, angle, margin);
        var corners = polygon.corners();
        var bbox;
        if(angle === 0){
            var min = corners[2]; // topLeft
            var max = corners[1]; // bottomRight
            
            bbox = new pvc.Rect(min.x, min.y, max.x - min.x, max.y - min.y);
        } else {
            bbox = polygon.bbox();
        }
        
        bbox.sourceCorners   = corners;
        bbox.sourceAngle     = angle;
        bbox.sourceAlign     = align;
        bbox.sourceTextWidth = textWidth;
        
        return bbox;
    }