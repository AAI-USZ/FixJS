function(data) {
				var item = (data.items instanceof Array ? data.items[0] : data.items);
				
				var msg = messages["Are you sure you want to delete the site configuration '"] + item.Name + "'?"; //$NON-NLS-1$
				dialogService.confirm(msg, function(confirmed) {
					if (confirmed) {
						var location = item.Location;
						var userData = data.userData;
						var siteService = mSiteClient.forLocation(serviceRegistry, location);
						siteService.deleteSiteConfiguration(location).then(userData.deleteCallback, userData.errorCallback);
					}
				});
			}