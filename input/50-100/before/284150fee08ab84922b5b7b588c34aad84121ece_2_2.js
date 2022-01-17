function showTipsy(mark) {
//        console.log("[TIPSY] Show IN");
        
        if (!$canvas) {
            initBehavior(mark);
        }
        
        setTarget(pv.event.target);
        
        $fakeTipTarget.attr('title', getTooltipText(mark));
        
        setFakeTipTargetBounds(opts.followMouse ? getMouseBounds() : getInstanceBounds(mark));
        
        $fakeTipTarget.tipsy("enter");
        
//        console.log("[TIPSY] Show OUT");
    }