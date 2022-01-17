function( error, notificationSettings ){
				args.usernotificationsettings = notificationSettings;
		    	test.ok( args.usernotificationsettings.should.have.property("notificationOnNewResource", 0));
		    	UserNotificationSettings.updateUserNotificationSettings( args, function( error, updatedSettings){
		    		test.ok( updatedSettings.should.have.property("notificationOnNewResource", 3));
		    		test.done();
		    	});
		    }