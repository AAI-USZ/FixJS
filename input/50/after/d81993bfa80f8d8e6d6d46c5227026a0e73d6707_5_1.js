function(error, notificationListener ){
				if ( error ){
					console.log( error );
				}
				
				test.ok( notificationListener.should.have.property( 'user', 'aka87') );
				test.done();
			}