function() {
			beforeEach(function() {
				this.btapp = new Btapp;
				this.btapp.bind('plugin:install_plugin', function(options) {
					options.install = false;
				});
			});
			afterEach(function() {
				this.btapp.disconnect();
			});
			it('pairs', function() {
				runs(function() {
					this.paired = false;
					this.btapp.bind('pairing:found', _.bind(function(info) {
						this.paired = true;
						expect(info.name).toEqual('Torque');
					}, this));
					this.btapp.connect();
				});
				
				waitsFor(function() {
					return this.paired;
				}, "client pairing", 15000);
				
				runs(function() {
					expect(this.paired).toBeTruthy();
				});
			});
			it('connects', function() {
				runs(function() {
					this.connected = false;
					this.btapp.bind('client:connected', _.bind(function() {
						this.connected = true;
					}, this));
					this.btapp.connect();
				});
				
				waitsFor(function() {
					return this.connected;
				}, "client connection", 15000);
				
				runs(function() {
					expect(this.connected).toBeTruthy();
				});
			});
		}