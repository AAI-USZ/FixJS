function simulateCompassNeedsCalibration(){

    var d = new Date();
    var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    var stamp = stamp + d.getUTCMilliseconds();
    
    cnce = new WDomEvent('compassneedscalibration', null, null, null, false, true, stamp);
    
    var randomTime = Math.floor(Math.random()*1000*10);
    console.log("Milliseconds until next CompassNeedsCalibrationEvent: " + randomTime);
    
    var json = null;
    for(i = 0; i < objectRefsDo.length; i++){
			
        if(objectRefsDo[i][1] == "compassneedscalibration"){
            console.log('Firing back to' + objectRefsDo[i][0]);
            json = rpcHandler.createRPC(objectRefsDo[i][0], "onEvent", cnce);
            rpcHandler.executeRPC(json);
        }
    }
    if(listeningToCompassNeedsCalibration){
            setTimeout(function(){ simulateCompassNeedsCalibration(); }, randomTime);        
    }


}