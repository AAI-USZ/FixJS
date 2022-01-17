function hideTipsy() {
//        console.log("[TIPSY] Hide");
        
        // Release real target
        setTarget(null);
        
        if ($fakeTipTarget) {
            $fakeTipTarget.tipsy("leave");
        }
    }