function(eventObj){
					eventObj.preventDefault();
					self[ev]({x:view.translateX(eventObj.clientX),
			      		y:view.translateY(eventObj.clientY), target: view});
			      	// FIXME having trouble using EventBus here, help me out!
			      	// self.trigger(Events[ev.toUpperCase()], {x:view.translateX(eventObj.clientX),
			      	// y:view.translateY(eventObj.clientY), target: view});
			    }