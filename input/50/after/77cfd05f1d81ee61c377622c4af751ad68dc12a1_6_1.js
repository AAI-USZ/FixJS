function( error, updatedSettings){
		    		console.log( error );
		    		test.ok( updatedSettings.should.have.property("notificationOnNewResource", 3));
		    		test.done();
		    	}