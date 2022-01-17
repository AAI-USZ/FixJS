function(test){
			var target = {'target_uuid':'abc1230'};
			//target.target_uuid = tuid;
			var updateAttributes = {'title':'jericho twist', 'path':'www.google.com'};
			MediaFile.updateMediaFile(target, updateAttributes, function(error, updatedMediaFile){				
				console.log("expect = " + updateAttributes.title);
				console.log("result = " + updatedMediaFile.title);
				//test.ok(updatedMediaFile.should.have.property('target_uuid'));
				test.ok(updatedMediaFile.title.should.be.eql(updateAttributes.title));
				test.done();	
			})
		}