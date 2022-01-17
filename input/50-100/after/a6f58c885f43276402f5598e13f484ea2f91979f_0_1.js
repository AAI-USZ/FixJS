function(){
		window.stock = {
			routers : {
				workspaceRouter : WorkspaceRouter
			},
			views : {},
			models : {},
			ticker: null
		};
		
		// clear local storage
		localStorage.clear();
		var started = Backbone.history.start({pushState:false, root:'/HTML5BackboneJQMRequireJS/'});
		window.stock.routers.workspaceRouter.navigate("#index", {trigger:true});
	}