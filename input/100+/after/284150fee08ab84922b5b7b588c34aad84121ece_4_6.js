function(rect){
//        pvc.log("[" + [this.x, this.x2, this.y, this.y2] + "]~" +
//                "[" + [rect.x, rect.x2, rect.y, rect.y2] + "]");

        // rect is trusted to be normalized...

        return (this.x2 > rect.x ) &&  // Some intersection on X
               (this.x  < rect.x2) &&
               (this.y2 > rect.y ) &&  // Some intersection on Y
               (this.y  < rect.y2);
    }