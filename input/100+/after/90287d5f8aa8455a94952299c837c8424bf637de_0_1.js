function(opts){
			opts = opts ? opts : {};

			debug("App initializing!");

			TorrentCollection.initialize();

			namespace.rootLayout = new DefaultLayout();

			namespace.rootLayout.render();

			namespace.app.vent = new Marionette.EventAggregator();

			namespace.poller = new Poller();
			if (opts.startPoller === undefined || opts.startPoller){
				debug("Starting poller...");
				namespace.poller.start();
			}

			require(["router"], function(Router) {
				Router.initialize();
			});


		}