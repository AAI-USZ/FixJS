function hideTipsy(ev) {
        var opId = getNewOperationId();
        
//        console.log("[TIPSY] Delayed Hide Begin opId=" + opId);
        
        if(delayOut > 0){
            setTimeout(function(){
                if(checkCanOperate(opId)){
                    hideTipsyCore(opId);
                } 
//              else
//              {
//                  console.log("[TIPSY] Delayed Hide Cancelled opId=" + opId);
//              }
                
            }, delayOut);
            
            return;
        }
        
//        console.log("[TIPSY] Hiding Immediately opId=" + opId);
        
        hideTipsyCore(opId);
    }