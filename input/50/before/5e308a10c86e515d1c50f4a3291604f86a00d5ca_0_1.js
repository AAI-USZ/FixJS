function syncTipsyLog(){
    var tip = pv.Behavior.tipsy;
    if(tip){
        tip.debug = pvc.debug;
        tip.log   = pvc.log;
    }
}