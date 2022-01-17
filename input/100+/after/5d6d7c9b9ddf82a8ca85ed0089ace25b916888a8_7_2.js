function(data) {
				var item = (data.items instanceof Array ? data.items[0] : data.items);
				
				var userData = data.userData;
				var newItem = userData.site || {} /* just update the HostingStatus */;
				newItem.HostingStatus = { Status: "stopped" }; //$NON-NLS-0$
				var location = item.Location;
				var siteService = mSiteClient.forLocation(serviceRegistry, location);
				var deferred = siteService.updateSiteConfiguration(location, newItem);
				progressService.showWhile(deferred).then(userData.stopCallback, userData.errorCallback);
			}