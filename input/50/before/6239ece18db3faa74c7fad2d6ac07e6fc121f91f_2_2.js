function hideTipsy() {
        if(pvc.debug >= 4){
            pvc.log("[TIPSY] Hide");
        }
        
        // Release real target
        setTarget(null);
        
        if ($fakeTipTarget) {
            $fakeTipTarget.tipsy("leave");
        }
    }