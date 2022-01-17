function(test){
			var args = {
				appType : 2, // don't think which app type matters for testing purpose
				section : 'A827346H7AFSSFG9'
			}
			OrganizationAction.resourcesInSection(args, function(error, resources){
				test.ok(resources.should.have.lengthOf(2));
				test.done();
			});	
		}