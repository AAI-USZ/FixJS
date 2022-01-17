function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			
			routes: {
				"" : 'goToCurrentFrame',
				"player/frame/:frameID"	: "goToFrame",
			},
			
			goToFrame : function( frameID )
			{
				console.log('	go to frame')
				console.log( _this.currentSequence );
				_this.goToFrame( _this.currentSequence.frames.get( frameID ) ) 
			},
			goToCurrentFrame : function()
			{
				_this.goToFrame( _this.currentFrame ) 
			}
			
		});

		this.router = new Router();
		Backbone.history.start();
	}