function(error, mediaFile){				
				test.ok(mediaFile.should.have.property('target_uuid'));
				test.done();	
			}