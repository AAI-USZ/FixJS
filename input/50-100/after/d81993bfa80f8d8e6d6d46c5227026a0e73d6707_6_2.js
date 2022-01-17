function(test){
			var args = {
				user : 'yk38',
				app  : 3
			}
			
			UserNotificationSettings.addNotificationSetting( args, function( error, newNotificationSetting){
				UserNotificationSettings.findNotificationSettings( args, function( error, notificationSettings ){
		    		test.ok( notificationSettings.should.have.property('notificationOnNewResource', 0 ));
		    		test.done();
		    	});
			
			});
		}