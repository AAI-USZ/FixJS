function(parentContext) {
		
		var settings = null;
		var mediator = null;
		var controller = null;

		return {

			getSettings : function(){
				if(!settings) {
					settings = parentContext ? _.extend({}, parentContext.getSettings()) : {};
				}
				return settings;
			},
			addSettings : function(newSettings){
				_.extend(this.getSettings(), newSettings);
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
					mediator = parentContext ? new Mediator(parentContext.getMediator()) : new Mediator();
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