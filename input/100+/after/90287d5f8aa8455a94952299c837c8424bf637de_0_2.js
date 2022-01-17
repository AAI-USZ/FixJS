function(Marionette, namespace, TorrentCollection, DefaultLayout, Poller){

		var APP_DEBUG = true;

		var debug = function(msg) {
			if (APP_DEBUG) {
				console.log(msg);
			}
		}

		var initialize = function(opts){
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


		};
		return {
			initialize	: initialize
		};
	}