function(e) {
		E.stopEvent(e);
		
		// this happens sometimes in Safari 
		if (e.clientX < 0 || e.clientY < 0) {
			return;
		}		

		var deltaX = e.clientX - this.lastMouseX;
		var deltaY = e.clientY - this.lastMouseY;
				
		var res = this.onDrag.bind(this.thisRef)(Wicket.$(this.elementId), deltaX, deltaY, e);
			
		if (res == null)
			res = [0, 0];
			
		this.lastMouseX = e.clientX + res[0];
		this.lastMouseY = e.clientY + res[1];
						
		return false;
	}