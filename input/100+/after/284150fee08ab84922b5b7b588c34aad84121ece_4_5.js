function(rect){
        // Does rect contain the point
        return (this.x >= rect.x) && (this.x <= rect.x2) &&
               (this.y >= rect.y) && (this.y <= rect.y2);
    }