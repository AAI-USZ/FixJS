function(test){
			var args = {
				user    : 'A7S7F8GA7SD11A7SDF8ASD7G',
		    	event  : 0,
		    	target : 'A7S7FHGA7SD11A7SDF8AS87G',
		    	app    : 1
			}
			
			NotificationListener.findNotificationListener(args, function(error, notificationListener ){
				args.notificationlistener = notificationListener;
				NotificationListener.removeNotificationListener( args, function(error, removedNotificationListener ){
					NotificationListener.findAllNotificationListeners(args, function(error, notificationListeners ){
						if ( error ){
							console.log( error );
							test.done();
						}
						else {
							test.ok( notificationListeners.should.have.lengthOf(0));
							test.done();
						}
						
					});
				});
			});	
		}