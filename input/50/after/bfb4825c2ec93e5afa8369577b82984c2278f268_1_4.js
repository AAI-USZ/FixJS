function(error, deletedMediaFile){											
				test.ok(deletedMediaFile.uuid.should.be.eql('abc1231'));
				test.done();	
			}