function(ev){
				elem.bind(ev, function(payload){
			      payload.preventDefault();
			      self[ev](view.translateX(payload.clientX),
			      	view.translateY(payload.clientY));
			    });				
			}