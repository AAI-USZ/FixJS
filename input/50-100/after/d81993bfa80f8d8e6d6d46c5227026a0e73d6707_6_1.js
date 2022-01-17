function(test){
		  
		    var args = {
				user : 'aka87',
				app  : 1
		    }
		    
		    UserNotificationSettings.findNotificationSettings( args, function( error, notificationSettings ){
		    	test.ok( notificationSettings.should.have.property('notificationOnNewResource', 0 ));
		    	test.done();
		    });
		}