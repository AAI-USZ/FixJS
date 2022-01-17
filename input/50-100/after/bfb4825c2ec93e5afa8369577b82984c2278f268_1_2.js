function(test){
			var uuid = {'uuid':'abc1230'};
			//uuid.uuid = tuid;
			var updateAttributes = {'title':'jericho twist', 'path':'www.google.com'};
			MediaFile.updateMediaFile(uuid, updateAttributes, function(error, updatedMediaFile){				
				console.log("expect = " + updateAttributes.title);
				console.log("result = " + updatedMediaFile.title);
				//test.ok(updatedMediaFile.should.have.property('uuid'));
				test.ok(updatedMediaFile.title.should.be.eql(updateAttributes.title));
				test.done();	
			})
		}