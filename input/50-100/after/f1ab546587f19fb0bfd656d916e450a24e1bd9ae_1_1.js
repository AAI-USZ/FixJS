function(){
			var events = ['mousedown', 'mousemove', 'dblclick'];
			
			events.forEach(function(ev){
				elem.bind(ev, function(eventObj){
					eventObj.preventDefault();
					self[ev]({x:view.translateX(eventObj.clientX),
			      		y:view.translateY(eventObj.clientY), target: view});
			      	// FIXME having trouble using EventBus here, help me out!
			      	// self.trigger(Events[ev.toUpperCase()], {x:view.translateX(eventObj.clientX),
			      	// y:view.translateY(eventObj.clientY), target: view});
			    });				
			});
			// self.bindAll(events);
		}