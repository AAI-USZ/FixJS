function(confirmed) {
					if (confirmed) {
						var location = data.items.Location;
						var userData = data.userData;
						var siteService = mSiteClient.forLocation(serviceRegistry, location);
						siteService.deleteSiteConfiguration(location).then(userData.deleteCallback, userData.errorCallback);
					}
				}