function syncTipsyLog(){
    var tip = pv.Behavior.tipsy;
    if(tip && tip.setDebug){
        tip.setDebug(pvc.debug);
        tip.log = pvc.log;
    }
}