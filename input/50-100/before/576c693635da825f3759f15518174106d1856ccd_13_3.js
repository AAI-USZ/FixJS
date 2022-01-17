function(test){
			var target = {"user_uid":"A7S7F8GA7SD98A7SDF8ASD7G"};
			//target.target_uuid = tuid;
			var updateAttributes = {'title':'jericho twist', 'shared':true};
			Tag.updateTag(target, updateAttributes, function(error, updatedTag){				
				console.log("expect = " + updateAttributes.shared);
				console.log("result = " + updatedTag.shared);
				//test.ok(updatedTag.should.have.property('user_uid'));
				test.ok(updatedTag.shared.should.be.eql(updateAttributes.shared));
				test.done();	
			})
		}