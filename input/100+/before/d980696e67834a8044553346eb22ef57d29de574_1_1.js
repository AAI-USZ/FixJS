function DeviceOrientationModule(rpcHandler) {
    var car, implFile = 'fake';
    if(connector == 'most'){
        try{
            var vehicleSystem = require('../../vehicle/contrib/vb-con/vc.js');
            vehicleBusAvailable = vehicleSystem.available;
            car = vehicleSystem.most;
            implFile = 'vehicle';
        }catch(e){
            console.log(e);
        }
    }else if(connector == 'simulator'){
        try{
            car = require('../../vehicle/contrib/vb-sim/vs.js');
            implFile = 'sim';
            console.log('connecting to simulator');
            console.log('simulator available at http://localhost:9898/simulator/vehicle.html');
        }catch(e){
            console.log(e);
        }
    }else if(connector == 'fake'){
        implFile = 'fake';    
        console.log('connecting to fake data generator');
     }

	var implModule = require('./webinos.deviceorientation.' + implFile + '.js');


	implModule.setRPCHandler(rpcHandler);
	implModule.setRequired(car);
	
	// inherit from RPCWebinosService
	this.base = RPCWebinosService;
	this.base(implModule.serviceDesc);




	
	this.addEventListener = function(params, successCB, errorCB, objectRef) {
		implModule.addEventListener(params, successCB, errorCB, objectRef);
	};
	
	this.removeEventListener = function(args, successCB, errorCB, objectRef) {
		implModule.removeEventListener(args, successCB, errorCB, objectRef);
	};
	}