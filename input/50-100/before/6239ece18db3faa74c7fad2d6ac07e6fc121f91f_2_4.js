function showTipsy(mark) {
        if(pvc.debug >= 4){
            pvc.log("[TIPSY] Show IN");
        }
        
        if (!$canvas) {
            initBehavior(mark);
        }
        
        setTarget(pv.event.target);
        
        $fakeTipTarget.attr('title', getTooltipText(mark));
        
        setFakeTipTargetBounds(opts.followMouse ? getMouseBounds() : getInstanceBounds(mark));
        
        $fakeTipTarget.tipsy("enter");
        
        if(pvc.debug >= 4){
            pvc.log("[TIPSY] Show OUT");
        }
    }