function(rect){
//        pvc.log("[" + [this.x, this.x2, this.y, this.y2] + "]~" +
//                "[" + [rect.x, rect.x2, rect.y, rect.y2] + "]");

        // rect is not trusted to be normalized...(line...)
        var minX = Math.min(rect.x, rect.x2),
            maxX = Math.max(rect.x, rect.x2),
            minY = Math.min(rect.y, rect.y2),
            maxY = Math.max(rect.y, rect.y2);

        return (this.x2 > minX ) &&  // Some intersection on X
               (this.x  < maxX ) &&
               (this.y2 > minY ) &&  // Some intersection on Y
               (this.y  < maxY);
    }