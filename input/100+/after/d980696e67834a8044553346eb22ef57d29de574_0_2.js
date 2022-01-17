function simulateDeviceMotion(){

    dme = new DeviceMotionEvent(new Acceleration(1,2,3), new Acceleration(2,4,6), new RotationRate(10,20,30), 2000);

    var randomTime = Math.floor(Math.random()*1000*10);
   
    
    var json = null;
    for(i = 0; i < objectRefsDo.length; i++){
			
        if(objectRefsDo[i][1] == "devicemotion"){
            console.log('Firing back to' + objectRefsDo[i][0]);
            json = rpcHandler.createRPC(objectRefsDo[i][0], "onEvent", dme);
            rpcHandler.executeRPC(json);
        }
    }
    if(listeningToDeviceMotion){
            console.log("Milliseconds until next DeviceMotionEvent: " + randomTime);
            setTimeout(function(){ simulateDeviceMotion(); }, randomTime);        
    }
}