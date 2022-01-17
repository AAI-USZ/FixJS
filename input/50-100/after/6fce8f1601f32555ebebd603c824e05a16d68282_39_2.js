function removeService(service) {
			var index = services.indexOf(service);
			if (index < 0) {
				throw { name: 'NotFound', message: 'Service not found' };
			}
			services.splice(index, 1);
			service.stop();
			unsubscribeFrom(service);
			serviceRemoved.dispatch(service);
		}