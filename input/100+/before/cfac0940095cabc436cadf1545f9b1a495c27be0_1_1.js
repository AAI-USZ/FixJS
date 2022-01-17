function(inputs) {
					
						if ( inputs.collectionRootType.value !== inputs.collectionRootType.placeholder ) {
						
							self.super.collection.populateWithType(inputs.collectionRootType.value)
						
							self.set('collectionRootType', inputs.collectionRootType.value)
						
						}
						
						if ( inputs.notifications.checked ) {
						
							if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
								
								window.webkitNotifications.requestPermission(function() {
								
									self.set('notifications', true)
								})
								
							} else {
							
								self.set('notifications', true)
							}
							
						} else {
							self.set('notifications', false)
						}
					}