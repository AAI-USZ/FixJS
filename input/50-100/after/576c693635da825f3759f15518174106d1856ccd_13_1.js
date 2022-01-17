function(test){
			var newTag = {
				user:"BSDF787D98A7SDF8ASD7G1",
				start:12,
				end:34,			
				type:2,
				target:"abc1234",
				title:"super magic dribble",
				description:"bend it like beckham",
				question:"aJfznhseQuOicWWAjx7F00",
				important:true,
				interest:false,
				examable:true,
				reviewlater:true,
				shared:false
			}
			Tag.createTag(newTag, function(error, tag){					
				test.ok(tag.should.have.property('description'));
				test.done();	
			})
		}