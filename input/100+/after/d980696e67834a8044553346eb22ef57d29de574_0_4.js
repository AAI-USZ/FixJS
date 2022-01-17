function simulateDeviceOrientation(){
    
    doe = new DeviceOrientationEvent(Math.floor(Math.random()*360), Math.floor(Math.random()*360), Math.floor(Math.random()*360));
    
    var randomTime = Math.floor(Math.random()*1000*10);
    
    
    var json = null;
    for(i = 0; i < objectRefsDo.length; i++){
			
        if(objectRefsDo[i][1] == "deviceorientation"){
            
            try{
                console.log('Firing back to' + objectRefsDo[i][0]);
                json = rpcHandler.createRPC(objectRefsDo[i][0], "onEvent", doe);
                rpcHandler.executeRPC(json);
            }catch(e){
                console.log('HIER FEHLER. NEED TO UNBIND. RECEPIENT NOT AVAILABLE ANYMORE');
            
            }
        }
    }
    if(listeningToDeviceOrientation){
            console.log("Milliseconds until next DeviceOrientationEvent: " + randomTime);
            setTimeout(function(){ simulateDeviceOrientation(); }, randomTime);        
    }
    
}