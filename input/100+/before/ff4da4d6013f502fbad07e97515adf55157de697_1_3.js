function(cb) {
			// Setup nock to respond to bad auth request
			var uri = url.parse(clientOptions.baseURI);
			var scope = nock(uri.href).get(uri.path).reply(401, 'Unauthorized');

			var rackit = new Rackit({
				user : mockOptions.user + 'blahblah',
				key : mockOptions.key + 'bloopidy'
			});
			rackit.init(function(err) {
				should.exist(err);
				err.should.be.an['instanceof'](Error);
				scope.done();
				cb();
			});
		}