function(Marionette, namespace, TorrentCollection, DefaultLayout){
		
		var initialize = function(){

			TorrentCollection.initialize();
			
			namespace.rootLayout = new DefaultLayout();
			
			namespace.rootLayout.render();
			
			namespace.app.vent = new Marionette.EventAggregator();

			require(["scripts/router"], function(Router) {
				Router.initialize();
			});
		};
		return {
			initialize	: initialize,
		};
	}