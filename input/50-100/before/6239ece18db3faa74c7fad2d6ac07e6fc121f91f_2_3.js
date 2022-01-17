function initBehavior(mark){
        // First time
        
        if(pvc.debug >= 4){
            pvc.log("[TIPSY] Creating");
        }
        
        createTipsy(mark);
        
        if(group) {
            addBehavior(tipsyBehavior, group);
        }
        
        /*
         * Cleanup the tooltip span on mouseout.
         * This is necessary for dimensionless marks.
         *
         * Note that the tip has pointer-events disabled
         * (so as to not interfere with other mouse events, such as "click");
         * thus the mouseleave event handler is registered on
         * the event target rather than the tip overlay.
         */
        if(usesPoint){
            // Being used as a point handler
            // Should hide the tipsy only in the unpoint event
            mark.event('unpoint', hideTipsy);
        }
    }