function(error, mediaFile){	
				tuid = mediaFile.uuid;
				console.log("t_uid = " + tuid);
				test.ok(mediaFile.should.have.property('uuid'));
				test.done();	
			}