function(error, mediaFile){	
				tuid = mediaFile.target;
				console.log("t_uid = " + tuid);
				test.ok(mediaFile.should.have.property('target'));
				test.done();	
			}