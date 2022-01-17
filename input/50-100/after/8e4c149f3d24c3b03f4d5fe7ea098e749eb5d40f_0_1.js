function(){
					document.addEventListener('eventWrapper', function(e){ 
						currentHandler.call(event.currentTarget, event, data);
						document.removeEventListener('eventWrapper',arguments.callee, false);
					});		
				
					var e =  document.createEvent('Event');
					e.initEvent('eventWrapper', false, false);
					document.dispatchEvent(e);
				}