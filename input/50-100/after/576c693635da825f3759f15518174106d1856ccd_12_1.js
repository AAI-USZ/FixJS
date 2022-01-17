function(test){
			var newMediaFile = {
				user:"A7S7F8GA7SD98A7SDF8ASD7G",				
				title:"How to make buble tea",
				path:"http://www.youtube.com/bt",
				type:1
			}
			MediaFile.createMediaFile(newMediaFile, function(error, mediaFile){	
				tuid = mediaFile.target;
				console.log("t_uid = " + tuid);
				test.ok(mediaFile.should.have.property('target'));
				test.done();	
			})
		}