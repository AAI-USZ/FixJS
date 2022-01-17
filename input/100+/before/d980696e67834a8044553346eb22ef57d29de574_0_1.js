function addEventListener(params, successCB, errorCB, objectRef){
    switch(params[0]){
        case "devicemotion":
            objectRefsDo.push([objectRef, params[0]]);
            console.log('listening to device motion');
            if(!listeningToDeviceMotion){
                listeningToDeviceMotion = true;
                simulateDeviceMotion();
            }
            break;
        case "deviceorientation":
            objectRefsDo.push([objectRef, params[0]]);
            if(!listeningToDeviceOrientation){
                listeningToDeviceOrientation = true;
                simulateDeviceOrientation();
            }

            break;
            
        case "compassneedscalibration":
            objectRefsDo.push([objectRef, params[0]]);
            if(!listeningToCompassNeedsCalibration){
                listeningToCompassNeedsCalibration = true;
                simulateCompassNeedsCalibration();
            }
            break;
            
        default:
            console.log('ERROR: not available');
            break;
    }
}