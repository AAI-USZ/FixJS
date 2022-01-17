function() {
		// UNBIND COMMON EVENTS
		$(document).unbind("touchend mouseup");
		this.getCanvasElement().unbind("click");
		$(document).unbind("sync");
		$(document).unbind("zoom");
		
		this.getCanvasElement().unbind("mousedown");			
		this.getCanvasElement().unbind("mousemove");
		this.getCanvasElement().unbind('mousewheel');

		this.getCanvasElement().unbind("touchstart");			
		this.getCanvasElement().unbind("touchmove");
		this.getCanvasElement().unbind('gesturestart');
		this.getCanvasElement().unbind('gestureend');
		this.getCanvasElement().unbind('doubletap');
	}