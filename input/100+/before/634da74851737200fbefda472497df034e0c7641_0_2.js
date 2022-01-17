function() {
			if(this.has('btapp')) {
				this.btapp = this.get('btapp');
			} else {
				this.btapp = new Btapp;
				this.set({connected: false});
				this.btapp.connect(_.extend(this.get('credentials'), {
					poll_frequency: 1000,
					queries: getQueries()
				}));
			}
			this.btapp.on('client:connected', _.bind(this.set, this, {connected: true}));
			this.btapp.on('client:error', _.bind(this.set, this, {connected: false}));
		}