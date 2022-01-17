function showTipsy(mark) {
        var opId = getNewOperationId();
        
//console.log("[TIPSY] Show IN opId=" + opId);
        
        if (!$canvas) {
            initBehavior(mark);
        }
        
        var isHidden = !$targetElem;
        
        setTarget(pv.event.target);
        
        $fakeTipTarget.attr('title', getTooltipText(mark));
        
        setFakeTipTargetBounds(opts.followMouse ? getMouseBounds() : getInstanceBounds(mark));
        
        if(isHidden){
            $fakeTipTarget.tipsy("enter");
        } else {
            $fakeTipTarget.tipsy("update");
        }
        
//        console.log("[TIPSY] Show OUT");
    }