function(test){
			var args = {
				user : 'A7S7FSD78FA98A7SDF8ASD7G',
				app  : 3
			}
			
			UserNotificationSettings.addNotificationSetting( args, function( error, newNotificationSetting){
				UserNotificationSettings.findNotificationSettings( args, function( error, notificationSettings ){
		    		test.ok( notificationSettings.should.have.property('notificationOnNewResource', 0 ));
		    		test.done();
		    	});
			
			});
		}