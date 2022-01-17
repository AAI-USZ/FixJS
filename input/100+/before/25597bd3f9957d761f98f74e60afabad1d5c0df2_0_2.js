function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			
			routes: {
				
				""						: 'goToFrame',
				"editor/frame/:frameID"	: "goToFrame",
				"player/frame/:frameID"	: "checkPlayer"
				
			},
			goToFrame : function( frameID ){  },
			
			checkPlayer : function( frameID ){  }
			
		});

		this.router = new Router();
		Backbone.history.start();
	}