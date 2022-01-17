function(test){
			var args = {
				section : 'A827346H7AFSSFG9'
			}
			OrganizationAction.resourcesInSection(args, function(error, resources){
				test.ok(resources.should.have.lengthOf(2));
				test.done();
			});	
		}