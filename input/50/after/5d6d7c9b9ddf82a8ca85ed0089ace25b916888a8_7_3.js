function(item) {
				if (item instanceof Array && item.length == 1)
					item = item[0];
				
				return item.HostingStatus && item.HostingStatus.Status === "started"; //$NON-NLS-0$
			}