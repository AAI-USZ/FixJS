function removeEventListener(params, successCB, errorCB, objectRef){
    //params[0] => objectRef from Listener // params[1] => type of Event [70, 'devicemotion']
    console.log(params);
    console.log(objectRef);
    var registeredListeners = 0;
    for(i = 0; i < objectRefsDo.length; i++ ){
        if(objectRefsDo[i][1] == params[1]){ //CHECK IF THERE ARE OTHER LISTENERS FOR A CERTAIN EVENT TYPE
			registeredListeners++;
		}
		if(objectRefsDo[i][0] == params[0]){ //FIND RELEVANT OBJECTREF AND REMOVE IT FROM THE LISTENER LIST
			objectRefsDo.splice(i,1);
			console.log('object# ' + params[0] + " removed (" +  params[1] + ")");
		}
	}
    
    if(registeredListeners <= 1){
        console.log('disabling event generation for' + params[1]);
        switch(params[1]){
            case "devicemotion":
                listeningToDeviceMotion = false;
                break;
            case "deviceorientation":
                listeningToDeviceOrientation = false;
                break;
            case "compassneedscalibration":
                listeningToCompassNeedsCalibration = false;
                break;
            default:
                console.log('ERROR: not available');
                break;
        }
    }
}