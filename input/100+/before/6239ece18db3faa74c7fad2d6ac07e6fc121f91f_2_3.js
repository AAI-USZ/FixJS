function setTarget(targetElem){
        
        if((!$targetElem && targetElem) || 
           ( $targetElem && $targetElem[0] !== targetElem)){
            if(pvc.debug >= 4){
                pvc.log("[TIPSY] Changing target element.");
            }
            
            if($targetElem){
                if(opts.followMouse){
                    $targetElem.unbind('mousemove', updateTipsy);
                }
                
                if(!usesPoint) {
                    $targetElem.unbind('mouseleave', hideTipsy);
                }
            }
            
            // ---------
            
            $targetElem = targetElem ? $(targetElem) : null;
            
            // ---------
            
            if($targetElem){
                if(opts.followMouse){
                    prevMouseX = prevMouseY = null;
                    $targetElem.mousemove(updateTipsy);
                }
                
                if(!usesPoint) {
                    $targetElem.mouseleave(hideTipsy);
                }
                
                if(group) {
                    hideGroup(group, tipsyBehavior);
                }
            }
        }
    }