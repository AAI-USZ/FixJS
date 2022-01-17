function(event, element, data){
		if (typeof event == 'string'){
			event = {type: event};
		} 
		if (!event.target || !event.srcElement){ event.target =  event.srcElement = element || this;}
		if (!event.currentTarget) event.currentTarget = event.target;
		if (!event.bubbling) event.bubbling = true;
		event.preventDefault = function(){}; // TODO
		event.stopPropagation = function(){ this.bubbling = false}; // Turn into a class?
		
	/*	if(isEventSupported(event.type)){
			// DOM events
			if ('dispatchEvent' in document.documentElement){	// Non IE
				var e =  document.createEvent('Event');
				e.initEvent(event.type, true, true);
				if(typeof element != 'undefined') element.dispatchEvent(e);
				else document.dispatchEvent(e);
			} else {											// IE
				var e =  document.createEventObject('Event');
				if(typeof element != 'undefined') element.fireEvent('on'+event.type, e);
				else document.fireEvent('on'+event.type, e);
			}
		}else{*/
			// Custom events
			var thisEventListeners = listeners[event.type],
			currentHandler
			;
			if('addEventListener' in document.documentElement){		// Event handler execution wrapping (Non IE)
				document.addEventListener('eventWrapper', function(e){
					currentHandler.call(event.currentTarget, event, data);
					document.removeEventListener('eventWrapper',arguments.callee, false);
				});		
				var fireWrapper = function(){
					var e =  document.createEvent('Event');
					e.initEvent('eventWrapper', false, false);
					document.dispatchEvent(e);
				};
			} else{
				document.documentElement.eventWrapper = 0; 
				document.documentElement.attachEvent("onpropertychange", function(e) {
					if (e.propertyName == "eventWrapper") {
						currentHandler.call(event.currentTarget, event, data);
						document.documentElement.detachEvent("onpropertychange",arguments.callee);
					}
				});
				var fireWrapper = function() {
					document.documentElement.eventWrapper++;
				};
			}
			for (var i=0, length = thisEventListeners.length; i < length; i++){	// Handler iteration 
				if (typeof element != 'undefined'){
					if (thisEventListeners[i].element === event.currentTarget){
						currentHandler = thisEventListeners[i].listener;
						fireWrapper();
					} 
					if (element.parentNode !== null && event.bubbling){ // Event bubbling
						event.currentTarget = element.parentNode;
						Eventi.fire(event, element.parentNode, data);	
					}
				} else {
					currentHandler = thisEventListeners[i].listener;
					fireWrapper();
				}
			}
		//}	
	}