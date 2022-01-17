function(test){
		  
		    var args = {
				user : 'A7S7F8GA7SD11A7SDF8ASD7G',
				app  : 1
		    }
		    
		    UserNotificationSettings.findNotificationSettings( args, function( error, notificationSettings ){
		    	test.ok( notificationSettings.should.have.property('notificationOnNewResource', 0 ));
		    	test.done();
		    });
		}