function updateTipsy(ev){
        if($fakeTipTarget) {
            
            /* Don't know why: 
             * the mouseover event is triggered at a fixed interval
             * as long as the mouse is over the element, 
             * even if the mouse position does not change... 
             */
            if(prevMouseX != null && 
               prevMouseX === ev.clientX && 
               prevMouseY === ev.clientY){ 
                 return;
            }
            
            if(pvc.debug >= 4){
                pvc.log("[TIPSY] Update");
            }
            
            prevMouseX = ev.clientX; 
            prevMouseY = ev.clientY;
            
            // -------------
            
            setFakeTipTargetBounds(getMouseBounds(ev));
            
            $fakeTipTarget.tipsy("update");
        }
    }