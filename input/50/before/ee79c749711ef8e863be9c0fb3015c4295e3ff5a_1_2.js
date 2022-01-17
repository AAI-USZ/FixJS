function(){
				if(!mediator) {
					mediator = parentContext ? new Mediator(parentContext.getMediator()) : new Mediator();
				}
				return mediator;
			}