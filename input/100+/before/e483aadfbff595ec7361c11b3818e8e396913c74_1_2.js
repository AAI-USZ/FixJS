function (e) {
		var that = this;
		switch(e.type) {
			case START_EV:
				if (!hasTouch && e.button !== 0) return;
				if (e.target.tagName === "TEXTAREA") return;
				if (e.target.tagName === "INPUT") return;
				if (e.target.tagName === "SELECT") return;
				if (!hasTouch && !that.options.mouseGestures) return;
				that._start(e);
				break;
			case MOVE_EV: that._move(e); 
			  
				if (!hasTouch && !that.options.mouseGestures) return;
				break;
			case END_EV:
			case CANCEL_EV: that._end(e); 
				if (!hasTouch && !that.options.mouseGestures) return;
				break;
			case RESIZE_EV: that._resize(); 
				if (!hasTouch && !that.options.mouseGestures) return;
				break;
			case WHEEL_EV: that._wheel(e); break;
			case 'mouseout': that._mouseout(e); break;
			case 'webkitTransitionEnd': that._transitionEnd(e); break;
		}
	}