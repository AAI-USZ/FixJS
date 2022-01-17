function(test){
			var target = {'target':'abc1230'};
			//target.target = tuid;
			var updateAttributes = {'title':'jericho twist', 'path':'www.google.com'};
			MediaFile.updateMediaFile(target, updateAttributes, function(error, updatedMediaFile){				
				console.log("expect = " + updateAttributes.title);
				console.log("result = " + updatedMediaFile.title);
				//test.ok(updatedMediaFile.should.have.property('target'));
				test.ok(updatedMediaFile.title.should.be.eql(updateAttributes.title));
				test.done();	
			})
		}