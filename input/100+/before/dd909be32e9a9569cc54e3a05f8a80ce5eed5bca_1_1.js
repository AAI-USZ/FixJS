function() {
			it('should create a user', function(done) {
				dpd.users.post(credentials, function (user, err) {
					if(!user) {
						throw 'user did not exist';
					}
					expect(user.id.length).to.equal(16)
					delete user.id;
					expect(user).to.eql({email: credentials.email});
					done(err);
				})
			})
		}