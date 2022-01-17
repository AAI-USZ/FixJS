function(error, mediaFile){	
				tuid = mediaFile.target_uuid;
				console.log("t_uid = " + tuid);
				test.ok(mediaFile.should.have.property('target_uuid'));
				test.done();	
			}