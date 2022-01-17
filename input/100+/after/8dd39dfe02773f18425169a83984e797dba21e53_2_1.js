function(done) {
			var test = this;
			this.ctx.url = '/login';
			this.ctx.query = {};
			this.ctx.session = {
				set: function(changes) {
					expect(changes).to.eql({uid: '123', path: '/users'});
					return this;
				},
				save: function(fn) {
					expect(fn).to.be.a('function');
					fn();
				}
			};
			this.ctx.req.url = '/users/login';
			this.ctx.req.method = 'POST';
			this.ctx.req.body.email = 'foo@bar.com';
			this.ctx.req.body.password = 'abcd';
			this.uc.store.find = function(query, fn) {
				expect(query).to.eql({email: 'foo@bar.com', password: 'abcd'});
				fn(null, {id: '123', email: 'foo@bar.com'});
			}
			this.complete = function(err, res) {
				done();
			}

			this.uc.handle(this.ctx);
		}