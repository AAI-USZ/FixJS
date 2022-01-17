function(error, deletedMediaFile){											
				test.ok(deletedMediaFile.target.should.be.eql('abc1231'));
				test.done();	
			}