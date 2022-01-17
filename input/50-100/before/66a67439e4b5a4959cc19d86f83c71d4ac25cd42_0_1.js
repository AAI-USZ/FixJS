function(e){
		//disable scrolling when not focused
		if (this.wrap.hasClass('x-trigger-wrap-focus') == false) {
			return;
		}

		var delta = e.getWheelDelta();
		if (delta > 0) {
			this.onSpinUp();
			e.stopEvent();
		}
		else
			if (delta < 0) {
				this.onSpinDown();
				e.stopEvent();
			}
	}