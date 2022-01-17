function createSiteCommands(serviceRegistry) {
		
		var commandService = serviceRegistry.getService("orion.page.command"), //$NON-NLS-0$
		    dialogService = serviceRegistry.getService("orion.page.dialog"), //$NON-NLS-0$
		    progressService = serviceRegistry.getService("orion.page.progress"); //$NON-NLS-0$
		
		var editCommand = new Command({
			name: messages["Edit"],
			tooltip: messages["Edit the site configuration"],
			imageClass: "core-sprite-edit", //$NON-NLS-0$
			id: "orion.site.edit", //$NON-NLS-0$
			visibleWhen: function(item) {
				if (item instanceof Array && item.length == 1)
					item = item[0];
				
				return item.HostingStatus;
			},
			hrefCallback: function(data) {
				var item = (data.items instanceof Array ? data.items[0] : data.items);
				return mSiteUtils.generateEditSiteHref(item);
			}
		});
		commandService.addCommand(editCommand);

		var startCommand = new Command({
			name: messages["Start"],
			tooltip: messages["Start the site"],
			imageClass: "core-sprite-start", //$NON-NLS-0$
			id: "orion.site.start", //$NON-NLS-0$
			visibleWhen: function(item) {
				if (item instanceof Array && item.length == 1)
					item = item[0];
				
				return item.HostingStatus && item.HostingStatus.Status === "stopped"; //$NON-NLS-0$
			},
			/**
			 * @param {SiteConfiguration} [userData.site] If passed, we'll mutate this site config.
			 * @param {Function} [userData.startCallback]
			 * @param {Function} [userData.errorCallback]
			 */
			callback: function(data) {
				var item = (data.items instanceof Array ? data.items[0] : data.items);
					
				var userData = data.userData;
				var newItem = userData.site || {} /* just update the HostingStatus */;
				newItem.HostingStatus = { Status: "started" }; //$NON-NLS-0$
				var location = item.Location;
				var siteService = mSiteClient.forLocation(serviceRegistry, location);
				var deferred = siteService.updateSiteConfiguration(location, newItem);
				progressService.showWhile(deferred).then(userData.startCallback, userData.errorCallback);
			}});
		commandService.addCommand(startCommand);

		var stopCommand = new Command({
			name: messages["Stop"],
			tooltip: messages["Stop the site"],
			imageClass: "core-sprite-stop", //$NON-NLS-0$
			id: "orion.site.stop", //$NON-NLS-0$
			visibleWhen: function(item) {
				if (item instanceof Array && item.length == 1)
					item = item[0];
				
				return item.HostingStatus && item.HostingStatus.Status === "started"; //$NON-NLS-0$
			},
			/**
			 * @param {SiteConfiguration} [data.userData.site] If passed, we'll mutate this site config.
			 * @param {Function} [data.userData.stopCallback]
			 * @param {Function} [data.userData.errorCallback]
			 */
			callback: function(data) {
				var item = (data.items instanceof Array ? data.items[0] : data.items);
				
				var userData = data.userData;
				var newItem = userData.site || {} /* just update the HostingStatus */;
				newItem.HostingStatus = { Status: "stopped" }; //$NON-NLS-0$
				var location = item.Location;
				var siteService = mSiteClient.forLocation(serviceRegistry, location);
				var deferred = siteService.updateSiteConfiguration(location, newItem);
				progressService.showWhile(deferred).then(userData.stopCallback, userData.errorCallback);
			}});
		commandService.addCommand(stopCommand);

		var deleteCommand = new Command({
			name: messages["Delete"],
			tooltip: messages["Delete the site configuration"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "orion.site.delete", //$NON-NLS-0$
			visibleWhen: function(item) {
				if (item instanceof Array && item.length == 1)
					item = item[0];
				
				return item.HostingStatus && item.HostingStatus.Status === "stopped"; //$NON-NLS-0$
			},
			/**
			 * @param {Function} [data.userData.deleteCallback]
			 * @param {Function} [data.userData.errorCallback]
			 */
			callback: function(data) {
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
			}});
		commandService.addCommand(deleteCommand);
	}