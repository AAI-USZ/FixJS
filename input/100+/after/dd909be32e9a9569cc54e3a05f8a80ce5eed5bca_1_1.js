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

			it('should validate for duplicate email', function(done) {
				chain(function(next) {
					dpd.users.post(credentials, next);
				}).chain(function(next) {
					dpd.users.post(credentials, next);
				}).chain(function(next, result, err) {
					expect(result).to.not.exist;
					expect(err.errors.email).to.be.ok;
					done();
				});
			});
		}