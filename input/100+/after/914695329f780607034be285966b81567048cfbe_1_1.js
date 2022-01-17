function() {
				runs(function() {
					this.connected = false;
					this.callback = jasmine.createSpy();
					this.btapp.bind('client:error', this.callback);
					this.btapp.connect({
						username: randomString(),
						password: randomString()
					});
				});
				
				waitsFor(function() {
					return this.callback.callCount > 0;
				}, "remote connection", 15000);
				
				runs(function() {
					expect(this.callback).toHaveBeenCalled();
				});
			}