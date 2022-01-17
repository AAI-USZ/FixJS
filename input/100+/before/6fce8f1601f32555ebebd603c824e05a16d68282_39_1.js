function load(newSettings) {
			removeAllServices();
			settings = newSettings;
			servicesToLoadCount = settings.length;
			for (var i = 0; i < settings.length; i++) {
				loadService(settings[i]);
			}

			function loadService(serviceSettings) {
				var serviceName = serviceSettings.baseUrl + '/buildService';
				require([serviceName], function (Service) {
					var serviceInstance = new Service(serviceSettings);
					addService(serviceInstance);
					servicesToLoadCount--;
					if (servicesToLoadCount === 0) {
						servicesLoaded.dispatch();
					}
				});
			}

			function removeAllServices() {
				failedCount = 0;
				services.forEach(function (s) {
					unsubscribeFrom(s);
					serviceRemoved.dispatch(s);
				});
				services = [];
			}
		}