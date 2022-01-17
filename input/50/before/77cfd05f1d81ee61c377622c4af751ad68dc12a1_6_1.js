function( error, updatedSettings){
		    		test.ok( updatedSettings.should.have.property("notificationOnNewResource", 3));
		    		test.done();
		    	}