function addService(service) {
			if (!service.name) {
				throw { name: 'ArgumentInvalid', message: 'service.name not defined' };
			}
			initializeServiceLogging(service);
			subscribeTo(service);
			services.push(service);
			console.log('Service added: ' + service.name, service.settings);
			serviceAdded.dispatch(service);
		}