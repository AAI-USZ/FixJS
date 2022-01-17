function hideTipsyCore(opId) {
//        console.log("[TIPSY] Hiding opId=" + opId);
      
        // Release real target
        setTarget(null);
      
        if ($fakeTipTarget) {
            $fakeTipTarget.tipsy("leave");
        }
    }