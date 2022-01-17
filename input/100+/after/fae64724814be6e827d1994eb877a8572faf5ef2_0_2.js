function (namespaces) {
		
		var elem = this,
		$elem = jQuery(elem);
		
		if (typeof window.ontouchstart !== "undefined") {
			$elem.off("touchstart", jQuery.event.special.touchclick.touchstart);
			$elem.off("touchmove", jQuery.event.special.touchclick.touchmove);
			$elem.off("touchend", jQuery.event.special.touchclick.touchend);
		} else {
			$elem.off("click", jQuery.event.special.touchclick.click);
		}
	}