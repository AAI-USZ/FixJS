function (event) {

		that.parent.innerHide(event);
		
		that.$content.attr("aria-hidden", "true");

		// Unbind events
		ch.utils.document.unbind(ch.events.KEY.ESC + " " + ch.events.KEY.UP_ARROW + " " + ch.events.KEY.DOWN_ARROW);

		return that;
	}