function(rect){
        // Does rect contain the point
        var minX = Math.min(rect.x, rect.x2),
            maxX = Math.max(rect.x, rect.x2),
            minY = Math.min(rect.y, rect.y2),
            maxY = Math.max(rect.y, rect.y2);

        return (this.x >= minX) && (this.x <= maxX) &&
               (this.y >= minY) && (this.y <= maxY);
    }