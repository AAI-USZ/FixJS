function(APIKEY, respondToCrewmember) {
		console.log('New cremember asking for supervisor for APIKEY: ' + APIKEY);
		// Make sure the APIKEY is valid, create a new supervisor (session), start listening, and return it.
		if (apikeys[APIKEY] && apikeys[APIKEY].allowed) {
			var thisSupervisor = getSupervisor(APIKEY);
			setupForeman(APIKEY, supervisor);
			// Add a socket.io listener for each crewmember's supervisor
			// TODO: On Socket.disconnect, remove this item from the foremen object
			console.log('New cremember reporting to: /' + supervisorNamespace);
				
			respondToCrewmember(supervisorNamespace);
		}
	}