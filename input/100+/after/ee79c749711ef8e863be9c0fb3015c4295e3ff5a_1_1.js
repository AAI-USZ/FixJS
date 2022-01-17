function(parentContext) {
		
		var settings = parentContext ? new Core.Settings(parentContext.getSettings()) : new Core.Settings();
		var mediator = parentContext ? new Mediator(parentContext.getMediator()) : new Mediator();
		var controller = null; // lets do lazy initialization, because controller needs its context as a reference

		return {

			getSettings : function(){
				return settings;
			},
			
			
			getController : function() {
				if(!controller) {
					controller = new Controller(this);
				}
				return controller;
			},
			setController : function(newController) {controller = newController;},
			
			getMediator : function(){
				if(!mediator) {
					
				}
				return mediator;
			},
			setMediator : function(newMediator) {mediator = newMediator;},
			
			getParentContext : function(){return parentContext;},
			
			activate : function() {
				this.getController().init();
			},
		};

	}