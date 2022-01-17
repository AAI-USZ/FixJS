function(test){
			var args = {
				user : 'aka87',
				app  : 1,
		    	
		    	notificationOnNewResource : 3,
  				notificationOnLike      : 2,
  				notificationOnComment   : 1,
  				notificationOnStar      : 3
			}
			UserNotificationSettings.findNotificationSettings( args, function( error, notificationSettings ){
				
				args.usernotificationsettings = notificationSettings;
		    	test.ok( args.usernotificationsettings.should.have.property("notificationOnNewResource", 0));
		    	UserNotificationSettings.updateUserNotificationSettings( args, function( error, updatedSettings){
		    		console.log( error );
		    		test.ok( updatedSettings.should.have.property("notificationOnNewResource", 3));
		    		test.done();
		    	});
		    }); 
		}