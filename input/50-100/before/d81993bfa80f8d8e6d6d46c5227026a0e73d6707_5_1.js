function(test){
			var args = {
				user    : 'A7S7F8GA7SD11A7SDF8ASD7G',
		    	event  : 0,
		    	target : 'A7S7FHGA7SD11A7SDF8AS87G',
		    	app     : 1
			}
			
			NotificationListener.findNotificationListener(args, function(error, notificationListener ){
				if ( error ){
					console.log( error );
				}
				
				test.ok( notificationListener.should.have.property( 'user', 'A7S7F8GA7SD11A7SDF8ASD7G') );
				test.done();
			});
		}